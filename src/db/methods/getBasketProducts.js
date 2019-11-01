const mongoose = require('../connection')

const BasketAction = mongoose.model('BasketAction')

async function getBasketProducts(basketId) {
  const actions = await BasketAction.find(
    {
      basketId: basketId
    },
    {
      productKey: 1,
      type: 1
    }
  )
  console.log('actions', actions)
  const productsKey = [ ...new Set(actions.map(({ productKey }) => productKey)) ]
  console.log('productsKeys', productsKey)
  const basketProducts = productsKey.reduce((acc, key) => {
    acc[key] = {
      productKey: key,
      quantity: 0
    }
    return acc
  }, {})
  actions.forEach(({ productKey, type }) => {
    basketProducts[productKey].quantity += type === 'add' ? 1 : -1
  })

  return (
    Object.values(basketProducts)
    .filter(({ quantity }) => quantity !== 0)
  )
}

module.exports = getBasketProducts