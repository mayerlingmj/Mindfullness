const Chakra = require('../models/chakra')
const Crystal = require('../models/crystal')
const Collection = require('../models/collection')

module.exports = {
  create,
  index,
  show,
  edit,
  update,
  delete: deleteCollection,
  removeFromCollection
}
