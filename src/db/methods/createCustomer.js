const mongoose = require('../connection')
const assert = require('./assert')

const Customer = mongoose.model('Customer')


async function createCustomer({ firstname, lastname, email }) {
  assert(!!firstname, true, 'firstname_missing')  
  assert(firstname, String, 'firstname_not_string')

  assert(!!lastname, true, 'lastname_missing')  
  assert(lastname, String, 'lastname_not_string')

  assert(!!email, true, 'email_missing')  
  assert(email, String, 'email_not_string')

  const customer = await Customer.findOne(
    { email },
    {
      _id: 1
    }
  )
  console.log('customer found', customer)
  assert(!!customer, false, 'customer_exists')

  const newCustomer = new Customer({
    firstname,
    lastname,
    email
  })
  const result = await newCustomer.save()
  return {
    _id: result._id,
    firstname: result.firstname,
    lastname: result.lastname,
    email: result.email,
    inShop: result.inShop
  }
}

module.exports = createCustomer