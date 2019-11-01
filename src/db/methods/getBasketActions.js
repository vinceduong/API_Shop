const mongoose = require('../connection')

const BasketAction = mongoose.model('BasketAction')

async function getBasketActions(basketId) {
  const actions = await BasketAction.find(
    {
      basketId: basketId
    }
  )
  return actions
    .map(({ customerId, basketId, type, productKey, timestamp }) => 
      ({ customerId, basketId, type, productKey, timestamp })
    )
}

module.exports = getBasketActions