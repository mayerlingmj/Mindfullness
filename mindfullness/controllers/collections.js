const Chakra = require('../models/chakra')
const Crystal = require('../models/crystal')
const Collection = require('../models/collection')
const User = require('../models/user')

module.exports = {
  create,
  index,
  show,
  edit,
  update,
  delete: deleteCollection,
  removeFromCollection
}

async function removeFromCollection(req, res) {
  try {
    // find the collection we're removing a chakra and crystal from
    const collectionDoc = await Collection.findById(req.params.collectionId)
    // remove the chakra and crystal by the id
    collectionDoc.chakrasAdded.remove(req.params.chakraId)
    collectionDoc.save(function (err) {
      res.redirect(`/collections/${collectionDoc._id}/edit`)
    })
    collectionDoc.crystalsAdded.remove(req.params.crystalId)
    collectionDoc.save(function (err) {
      res.redirect(`/collections/${collectionDoc._id}/edit`)
    })
  } catch (err) {
    res.send(err)
  }
}

function edit(req, res) {
  Collection.findById(req.params.id)
    .populate('crystalsAdded')
    .populate('chakrasAdded')
    .exec(function (err, collection) {
      if (!collection.collectionId.equals(req.collection._id)) {
        res.redirect('/')
      } else {
        res.render('collections/edit', { collection })
      }
    })
}

async function update(req, res) {
  try {
    const collection = await Collection.findById(req.params.id)
    if (!collection.userId.equals(req.user._id)) {
      res.redirect('/')
    } else {
      collection.name = req.body.name
      collection.save(function (err) {
        res.redirect(`/chakras/${req.user._id}/collections`)
        res.redirect(`/crystals/${req.user._id}/collections`)
      })
    }
  } catch (err) {
    res.send(err)
  }
}

async function deleteCollection(req, res) {
  try {
    const collection = await Collection.findById(req.params.id)
    if (!collection.userId.equals(req.user._id)) {
      res.redirect('/')
    } else {
      collection.remove()
      collection.save(function (err) {
        res.redirect(`/chakras/${req.user._id}/collections`)
        res.redirect(`/crystals/${req.user._id}/collections`)
      })
    }
  } catch (err) {
    res.send(err)
  }
}

function create(req, res) {
  const collection = new Collection(req.body)
  collection.userId = req.user._id
  collection.userName = req.user.name
  collection.save(function (err) {
    if (err) console.log(err)
  })
  res.redirect('/chakras')
  res.redirect('/crystals')
}

async function index(req, res) {
  if (req.user === undefined) {
    res.redirect('/')
  }
  try {
    const collections = await Collection.find({ userId: req.user._id })
    res.render('collections/index', {
      collections,
      title: 'Chakra Crystal'
    })
  } catch (err) {
    res.send(err)
  }
}

async function show(req, res) {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate('crystalsAdded')
      .populate('chakrasAdded')
    res.render('collections/show', {
      collection
    })
  } catch (err) {
    res.send(err)
  }
}
