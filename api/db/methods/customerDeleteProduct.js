const mongoose = require('../connection')
const assert = require('./assert')
const getBasketProducts = require('./getBasketProducts')
const getPriceFromBasketProducts = require('./getPriceFromBasketProducts')

const Product = mongoose.model('Product')
const Basket = mongoose.model('Basket')
const BasketAction = mongoose.model('BasketAction')

async function customerDeleteProduct({ customerId, productKey }) {
  console.debug('customerAddProduct', arguments[0])

  assert(!!customerId, true, 'customerId_is_missing')
  assert(customerId, String, 'customerId_is_not_string')
  assert(customerId.isValidObjectId(), true, 'customerId_is_not_valid')

  assert(!!productKey, true, 'productKey_is_missing')
  assert(productKey, String, 'productKey_is_not_string')

  const [product, currentBasket] = await Promise.all([
    Product.findOne(
      {
        key: productKey
      },
      {
        _id: 1
      }
    ),
    Basket.findOne(
      {
        customerId: customerId.toObjectId(),
        isClosed: false
      },
    )
  ])
  
  assert(!!product, true, 'product_does_not_exist')
  assert(!!currentBasket, true, 'customer_is_not_in_shop')

  const currentProducts = await getBasketProducts(currentBasket._id)

  assert(currentProducts.some(({ productKey: key }) => key === productKey), true, 'product_not_in_basket')

  const newBasketAction = new BasketAction({
    customerId: customerId.toObjectId(),
    basketId: currentBasket._id, 
    type: 'delete',
    productKey,
    timestamp: Date.now()
  })
  await newBasketAction.save()

  const newProducts = await getBasketProducts(currentBasket._id)
  const newPrice = await getPriceFromBasketProducts(newProducts)

  return {
    basket: {
      basketId: currentBasket._id,
      products: newProducts,
      price: newPrice,
      startStamp: currentBasket.startStamp,
      isClosed: currentBasket.isClosed,
      customerId: currentBasket.customerId
    }
  }
}
module.exports = customerDeleteProduct