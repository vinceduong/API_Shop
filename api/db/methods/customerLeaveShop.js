const mongoose = require('../connection')
const assert = require('./assert')
const getBasketProducts = require('./getBasketProducts')
const getPriceFromBasketProducts = require('./getPriceFromBasketProducts')
const Customer = mongoose.model('Customer')
const Basket = mongoose.model('Basket')

async function customerLeaveShop({ customerId }) {
  console.debug('customerLeaveShop', arguments[0])

  assert(!!customerId, true, 'customer_id_is_missing')
  assert(customerId, String, 'customer_id_is_not_string')
  assert(customerId.isValidObjectId(), true, 'customer_id_is_not_valid')

  const customer = await Customer.findOne(
    {
      _id: customerId.toObjectId(),
    },
    {
      _id: 1,
      inShop: 1,
    }
  )
  assert(!!customer, true, 'customer_does_not_exist')
  assert(customer.inShop, true, 'customer_already_outside_shop')

  const [currentBasket, updatedCustomer] = await Promise.all([
    Basket.findOneAndUpdate(
      {
        customerId,
        isClosed: false,
      },
      {
        $set: {
          isClosed: true,
          endStanp: Date.now()
        }
      },
      {
        useFindAndModify: false,
        new: true
      }
    ),
    Customer.findOneAndUpdate(
      { _id: customerId.toObjectId() },
      { $set: { inShop: false } },
      {
        new: true,
        useFindAndModify: false,
        projection: {
          _id: 1,
          inShop: 1
        }
      }
    )
  ])

  const finalProducts = await getBasketProducts(currentBasket._id)
  const finalPrice = await getPriceFromBasketProducts(finalProducts)
  return {
    customer: {
      customerId: updatedCustomer._id,
      inShop: updatedCustomer.inShop
    },
    basket: {
      basketId: currentBasket._id,
      customerId: currentBasket.customerId,
      startStamp: currentBasket.startStamp,
      endStamp: currentBasket.endStamp,
      products: finalProducts,
      price: finalPrice,
      isClosed: currentBasket.isClosed,
    }
  }
}

module.exports = customerLeaveShop