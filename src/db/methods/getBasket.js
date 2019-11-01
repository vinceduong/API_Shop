const mongoose = require('../connection')
const assert = require('./assert')

const getBasketActions = require('./getBasketActions')
const getBasketProducts = require('./getBasketProducts')
const getPriceFromBasketProducts = require('./getPriceFromBasketProducts')

const Basket = mongoose.model('Basket')

async function getBasket({ basketId }) {
  assert(!!basketId, true, 'basket_id_missing')
  assert(basketId, String, 'basket_id_not_string')
  assert(basketId.isValidObjectId(), true, 'customer_id_is_not_valid')

  const basket = await Basket.findOne(
    { _id: basketId.toObjectId() }
  )

  assert(!!basket, true, 'basket_does_not_exist')

  const [actions, products] = await Promise.all([
    getBasketActions(basketId),
    getBasketProducts(basketId)
  ])

  const price = await getPriceFromBasketProducts(products)

  return {
    basket: {
      basketId: basket._id,
      customerId: basket.customerId,
      startStamp: basket.startStamp,
      endStamp: basket.endStamp,
      actions,
      products,
      price,
      isClosed: basket.isClosed,
    }
  }
}

module.exports = getBasket