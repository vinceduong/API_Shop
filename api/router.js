const express = require('express')
const bodyParser = require('body-parser')
const methods = require('./db/methods')

const router = express.Router()
router.use(bodyParser.json())

const requestHandler = methodName => {
  return async (req, res) => {
    try {
      const { body } = req
      const result = await methods[methodName](body)
      res.status(200)
      res.send(result)
    } catch(error) {
      console.error(error)
      res.status(400)
      res.send({ error: error.message })
    }
  }
}

//POST
router.post('/create-customer', requestHandler('createCustomer'))
router.post('/customer-enter-shop', requestHandler('customerEnterShop'))
router.post('/customer-leave-shop', requestHandler('customerLeaveShop'))
router.post('/create-product', requestHandler('createProduct'))
router.post('/customer-add-product', requestHandler('customerAddProduct'))
router.post('/customer-delete-product', requestHandler('customerDeleteProduct'))

//GET
router.get('/get-customer', requestHandler('getCustomer'))
router.get('/get-basket', requestHandler('getBasket'))
router.get('/get-products', requestHandler('getProducts'))

module.exports = router