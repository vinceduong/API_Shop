const mongoose = require('../connection')
const assert = require('./assert')

const Customer = mongoose.model('Customer')


async function createCustomer({ firstname, lastname, email }) {
  console.debug('createCustomer', arguments[0])
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
  const savedCustomer = await newCustomer.save()
  return {
    customerId: savedCustomer._id,
    firstname: savedCustomer.firstname,
    lastname: savedCustomer.lastname,
    email: savedCustomer.email,
    inShop: savedCustomer.inShop
  }
}

module.exports = createCustomer