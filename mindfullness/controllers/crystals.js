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
function addToCollection(req, res) {
  Collection.findById(req.body.collectionId, function (err, collection) {
    collection.crystalsAdded.push(req.params.id)
    collection.save(function (e) {
      res.redirect(`/crystals/${req.params.id}`)
    })
  })
}
