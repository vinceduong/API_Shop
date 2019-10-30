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
      res.status(400)
      res.send({ error: error.message })
    }
  }
}

router.post('/create-customer', requestHandler('createCustomer'))
router.get('/get-customer', requestHandler('getCustomer'))
router.post('/customer-enter-shop', requestHandler('customerEnterShop'))
router.post('/customer-leave-shop', requestHandler('customerLeaveShop'))


module.exports = router