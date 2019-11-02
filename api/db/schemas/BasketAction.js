const { Schema } = require('mongoose')

const BasketActionSchema = new Schema({
  customerId: Schema.Types.ObjectId,
  basketId: Schema.Types.ObjectId,
  type: String,
  productKey: String,
  timestamp: Number
})

module.exports = {
  name: 'BasketAction',
  schema: BasketActionSchema
}