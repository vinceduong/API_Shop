const mongoose = require('mongoose')

const schemas = require('./schemas')

mongoose.connect('mongodb://localhost/exercice', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

schemas.forEach(({ schema, name }) => {
  mongoose.model(name, schema)
})

module.exports = mongoose