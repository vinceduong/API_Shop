const { Schema } = require('mongoose')

const ProductSchema = new Schema({
  name: String,
  key: String,
  price: Number,
})

module.exports = {
  name: 'Product',
  schema: ProductSchema
}