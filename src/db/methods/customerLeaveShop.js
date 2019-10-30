const mongoose = require('../connection')
const assert = require('./assert')

const Customer = mongoose.model('Customer')

async function customerLeaveShop({ _id }) {
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
  assert(customer.inShop, true, 'customer_already_outside_shop')

  const updatedCustomer = await Customer.findOneAndUpdate(
    { _id: _id.toObjectId() },
    { $set: { inShop: false } },
    {
      new: true,
      projection: {
        _id: 1,
        inShop: 1
      }
    }
  )

  return updatedCustomer
}

module.exports = customerLeaveShop