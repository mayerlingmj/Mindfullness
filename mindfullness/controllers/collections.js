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
    .exec(function (err, collection) {
      if (!collection.userId.equals(req.user._id)) {
        res.redirect('/')
      } else {
        res.render('collections/edit', { collection })
      }
    })
}
