const mongoose = require('../connection')
const assert = require('./assert')

const Customer = mongoose.model('Customer')
const Basket = mongoose.model('Basket')

async function customerEnterShop({ customerId }) {
  assert(!!customerId, true, 'customerId_is_missing')
  assert(customerId, String, 'customerId_is_not_string')
  assert(customerId.isValidObjectId(), true, 'customerId_is_not_valid')

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
  assert(customer.inShop, false, 'customer_already_in_shop')

  const newBasket = new Basket({
    customerId: customerId.toObjectId(),
    startStamp: Date.now()
  })

  const [updatedCustomer, savedBasket] = await Promise.all([
    Customer.findOneAndUpdate(
      { _id: customerId.toObjectId() },
      { $set: { inShop: true } },
      {
        new: true,
        projection: {
          _id: 1,
          inShop: 1,
        }
      }
    ),
    newBasket.save()
  ])

  return {
    customer: {
      customerId: updatedCustomer._id,
      inShop: updatedCustomer.inShop
    },
    basket: {
      basketId: savedBasket._id,
      products: [],
      price: 0,
      startStamp: savedBasket.startStamp,
      isClosed: savedBasket.isClosed,
      customerId: savedBasket.customerId
    }
  }
}
module.exports = customerEnterShop