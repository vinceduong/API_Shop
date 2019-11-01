const mongoose = require('../connection')
const assert = require('./assert')

const Customer = mongoose.model('Customer')

async function getCustomer({ email = null }) {
  assert(!!email, true, 'email_missing')
  assert(email, String, 'email_not_string')

  const customer = await Customer.findOne(
    { email },
    {
      _id: 1,
      firstname: 1,
      lastname: 1,
      email: 1,
      inShop: 1,
    }
  )

  assert(!!customer, true, 'customer_does_not_exist')

  return customer
}

module.exports = getCustomer