const mongoose = require('../connection')
const assert = require('./assert')

const Customer = mongoose.model('Customer')
const Basket = mongoose.model('Basket')

async function customerEnterShop({ _id }) {
  assert(_id, String, 'id_is_not_string')
  assert(!!_id, true, 'id_is_missing')
  assert(_id.isValidObjectId(), true, 'id_is_not_valid')

  const customer = await Customer.findOne(
    {
      _id: _id.toObjectId(),
    },
    {
      _id: 1,
      inShop: 1,
    }
  )
  assert(!!customer, true, 'customer_does_not_exist')
  assert(customer.inShop, false, 'customer_already_in_shop')

  const newBasket = new Basket({
    customerId: _id.toObjectId(),
    startStamp: Date.now()
  })

  const [updatedCustomer, savedBasket] = await Promise.all([
    Customer.findOneAndUpdate(
      { _id: _id.toObjectId() },
      { $set: { inShop: true } },
      {
        new: true,
        projection: {
          _id: 1,
          inShop: 1
        }
      }
    ),
    newBasket.save()
  ])

  return { customer: updatedCustomer, basket: savedBasket }
}
module.exports = customerEnterShop