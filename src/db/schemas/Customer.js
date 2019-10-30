const { Schema } = require('mongoose')

const CustomerSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  inShop: { type: Boolean, default: false }
})

CustomerSchema.methods = {
  greetings: function () {
    console.log('greetings ' + this.firstname)
  }
}

module.exports = {
  name: 'Customer',
  schema: CustomerSchema
}