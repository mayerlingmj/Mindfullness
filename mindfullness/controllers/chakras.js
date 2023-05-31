const Chakra = require('../models/chakra')
const Collection = require('../models/collection')
const User = require('../models/user')

module.exports = {
  index,
  new: newChakra,
  create,
  show,
  addToCollection
}
