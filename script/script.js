const axios = require('axios')
require('colors')
const CUSTOMER_EMAIL = 'jean.dujardin@mail.com'

const PRODUCT_1 = 'water_volvic'
const PRODUCT_2 = 'water_vittel'

const BASE_URL = 'http://localhost:3000'

const GET_CUSTOMER = `${BASE_URL}/get-customer`
const GET_BASKET = `${BASE_URL}/get-basket`
const CUSTOMER_ENTER_SHOP = `${BASE_URL}/customer-enter-shop`
const CUSTOMER_LEAVE_SHOP = `${BASE_URL}/customer-leave-shop`
const CUSTOMER_ADD_PRODUCT = `${BASE_URL}/customer-add-product`
const CUSTOMER_DELETE_PRODUCT = `${BASE_URL}/customer-delete-product`


async function script() {
  try {
    //GETTING CUSTOMER
    console.log('Getting customer data...'.blue)
    const { data: customer } = await axios.get(GET_CUSTOMER, {data: { email: CUSTOMER_EMAIL }})
    console.log(customer)
    const { customerId } = customer
    //CHECKING IF HE'S ALREADY IN SHOP
    if(customer.inShop) {
      console.log('Customer already in shop, leaving...'.red)
      await axios.post(CUSTOMER_LEAVE_SHOP, { customerId })
    }

    //ENTERING THE SHOP
    console.log('\nCustomer enters the shop...'.blue)
    const { data: customerEnterShop } = await axios.post(CUSTOMER_ENTER_SHOP, { customerId })
    console.log(customerEnterShop)

    //ADDING PRODUCT 1
    console.log(`\nCustomer adding Product 1 ${PRODUCT_1}...`.blue)
    const { data: basketStep1 } = await axios.post(CUSTOMER_ADD_PRODUCT, { customerId, productKey: PRODUCT_1 })
    console.log('Basket :'.green)
    console.table(basketStep1.basket.products)

    //ADDING PRODUCT 2
    console.log(`\nCustomer adding Product 2 ${PRODUCT_2}...`.blue)
    const { data: basketStep2 } = await axios.post(CUSTOMER_ADD_PRODUCT, { customerId, productKey: PRODUCT_2 })
    console.log('Basket :'.green)
    console.table(basketStep2.basket.products)

     //DELETING PRODUCT 1
     console.log(`\nCustomer deleting Product 1 ${PRODUCT_1}...`.blue)
     const { data: basketStep3 } = await axios.post(CUSTOMER_DELETE_PRODUCT, { customerId, productKey: PRODUCT_1 })
    console.log('Basket :'.green)
     console.table(basketStep3.basket.products)

     //LEAVING SHOP
    console.log('\nCustomer enters the shop...'.blue)
    const { data: customerLeaveShop } = await axios.post(CUSTOMER_LEAVE_SHOP, { customerId })
    console.log(customerLeaveShop)

    //DEBUGGING ACTIONS
    console.log('\nActions during the session...'.blue)
    const { data: basket } = await axios.get(GET_BASKET, {data: { basketId: customerLeaveShop.basket.basketId }})
    console.table(basket.actions.sort((a , b) => a.timestamp - b.timestamp).map(({ type, productKey, timestamp }) => ({
      type,
      productKey,
      date: new Date(timestamp)
    })))

  } catch (error) {
    console.log('ERROR IN SCRIPT'.red,
    {
      message: error.response.data.error,
      url: error.config.url
    }
    )
  }
}

script()