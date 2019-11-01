const mongoose = require('../connection')

const Product = mongoose.model('Product')

async function getPriceFromBasketProducts(basketProducts) {
  const productKeys = basketProducts.map(({ productKey }) => productKey)
  const prices = (await Product.find(
    {
      key: {
        $in: productKeys
      }
    },
    {
      key: 1,
      price: 1
    }
  )).reduce((acc, { key, price }) => {
    acc[key] = price
    return acc
  }, {})

 const totalprice =  basketProducts.reduce((price, { productKey, quantity }) => {
    return price + (quantity * prices[productKey])
  }, 0)
  return totalprice
}

module.exports = getPriceFromBasketProducts