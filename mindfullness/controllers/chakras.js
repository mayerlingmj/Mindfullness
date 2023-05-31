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
function newChakra(req, res) {
  if (req.user === undefined) {
    res.redirect('/')
  } else {
    res.render('chakras/new', {
      title: 'New Chakra'
    })
  }
}
function create(req, res) {
  const n = req.body.name
  req.body.name = n.toLowerCase()
  if (req.user === undefined) {
    res.redirect('/')
  } else {
    Chakra.create(req.body, function (err, createdChakra) {
      if (err) {
        return res.redirect('/chakras/new')
      }
      createdChakra.userCreated = req.user._id
      createdChakra.save(function (err) {
        res.redirect('/chakras')
      })
    })
  }
}
