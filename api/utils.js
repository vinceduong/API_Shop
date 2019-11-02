const mongoose = require('mongoose')

String.prototype.toObjectId = function () {
  return new mongoose.Types.ObjectId(this.toString())
}

String.prototype.isValidObjectId = function () {
  return mongoose.Types.ObjectId.isValid(this.toString())
}

const colors = require('colors')

console.debug = (name, content) => {
  if (process.env.DEBUG === 'ON') {
    console.log(colors.magenta('\n==========DEBUG LOG=========='))
    console.log(colors.red(`Method: "${name}"`))
    console.log('Params:'.blue)
    console.log(colors.grey(content))
    console.log(colors.magenta('==============================='))
  }
}