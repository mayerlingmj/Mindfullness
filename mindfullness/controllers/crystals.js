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
function index(req, res) {
  Crystal.find({}, function (err, crystalDocuments) {
    res.render('crystals/home', {
      crystals: crystalDocuments
    })
  })
  if (req.user === undefined) {
    res.redirect('/')
  }
}
function newCrystal(req, res) {
  if (req.user === undefined) {
    res.redirect('/')
  } else {
    res.render('crystals/new', {
      title: 'New Crystal'
    })
  }
}
function create(req, res) {
  const n = req.body.name
  req.body.name = n.toLowerCase()
  if (req.user === undefined) {
    res.redirect('/')
  } else {
    Crystal.create(req.body, function (err, createdCrystal) {
      if (err) {
        return res.redirect('/crystals/new')
      }
      createdCrystal.userCreated = req.user._id
      createdCrystal.save(function (err) {
        res.redirect('/crystals')
      })
    })
  }
}
