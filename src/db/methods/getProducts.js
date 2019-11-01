const mongoose = require('../connection')

const Product = mongoose.model('Product')

async function getProducts() {
  const products = await Product.find(
    {},
    {
      _id: 0,
      name: 1,
      key: 1,
      price: 1
    }
  )
  return products
}

module.exports = getProducts