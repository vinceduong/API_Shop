const assert = (element, evaluation, errorMessage) => {
  if ([Number, String, Array, Boolean].includes(evaluation) &&
    element.constructor === evaluation) return true
  if (element === evaluation) return true
  throw new Error(errorMessage)
}

module.exports = assert