const Chakra = require('../models/chakra')
const Collection = require('../models/collection')

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
async function index(req, res) {
  const chakras = await Chakra.find()
  res.render('chakras/home', { chakras })
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
async function show(req, res) {
  if (req.user === undefined) {
    res.redirect('/')
  }
  try {
    const chakra = await Chakra.findById(req.params.id).populate('userCreated')
    const collections = await Collection.find({
      userId: req.user._id,
      chakrasAdded: { $nin: req.params.id }
    })
    res.render('chakras/show', {
      title: 'more about: ',
      chakra,
      collections
    })
  } catch (err) {
    res.send(err)
  }
}
