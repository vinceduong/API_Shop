const mongoose = require('../connection')
const assert = require('./assert')

const Product = mongoose.model('Product')

async function createProduct({ name, key, price }) {
  assert(!!name, true, 'name_missing')  
  assert(name, String, 'name_not_string')

  assert(!!key, true, 'key_missing')  
  assert(key, String, 'keye_not_string')

  assert(!!price, true, 'price_missing')  
  assert(price, Number, 'price_not_number')

  const product = await Product.findOne(
    { key },
    {
      _id: 1
    }
  )
  console.log('customer found', customer)
  assert(!!product, false, 'customer_exists')

  const newProduct = new Product({
    name,
    key,
    price
  })
  const result = await newProduct.save()
  return {
    _id: result._id,
    key: key,
    name: result.name,
    price: result.price,
  }
}

module.exports = createProduct