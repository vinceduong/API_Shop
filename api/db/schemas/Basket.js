const { Schema } = require('mongoose')

const BasketSchema = new Schema({
  customerId: Schema.Types.ObjectId,
  startStamp: Number,
  endStamp: { type: Boolean, default: 0 },
  isClosed: { type: Boolean, default: false }
})

module.exports = {
  name: 'Basket',
  schema: BasketSchema
}