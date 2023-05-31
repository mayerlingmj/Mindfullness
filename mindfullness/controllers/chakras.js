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
function addToCollection(req, res) {
  Collection.findById(req.body.collectionId, function (err, collection) {
    collection.chakrasAdded.push(req.params.id)
    collection.save(function (e) {
      res.redirect(`/chakras/${req.params.id}`)
    })
  })
}
function index(req, res) {
  Chakra.find({}, function (err, chakraDocuments) {
    res.render('crystals/home', {
      chakras: chakraDocuments
    })
  })
  if (req.user === undefined) {
    res.redirect('/')
  }
}
