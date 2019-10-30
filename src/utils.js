const mongoose = require('mongoose')

String.prototype.toObjectId = function () {
  return new mongoose.Types.ObjectId(this.toString())
}

String.prototype.isValidObjectId = function () {
  return mongoose.Types.ObjectId.isValid(this.toString())
}