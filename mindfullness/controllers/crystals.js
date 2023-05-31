const Crystal = require('../models/crystal')
const Collection = require('../models/collection')
const User = require('../models/user')

module.exports = {
  index,
  new: newCrystal,
  create,
  show,
  addToCollection
}
