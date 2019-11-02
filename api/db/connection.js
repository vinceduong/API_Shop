const mongoose = require('mongoose')

const schemas = require('./schemas')

const URL = `mongodb://localhost/store`

//CONNECTION TO MONGOOSE
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//ADD MODELS TO MONGOOSE
schemas.forEach(({ schema, name }) => {
  mongoose.model(name, schema)
})

module.exports = mongoose