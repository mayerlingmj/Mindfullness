var router = require('express').Router()
const collectionCtrl = require('../controllers/collections')

router.get('/collections/:id', collectionCtrl.show)
router.get('/collections/:id/edit', collectionCtrl.edit)
router.put('/collections/:id', collectionCtrl.update)
router.delete('/collections/:id', collectionCtrl.delete)
router.delete(
  '/collections/:collectionId/chakras/:chakraId',
  collectionCtrl.removeFromCollection
)
router.delete(
  '/collections/:collectionId/crystals/:crystalId',
  collectionCtrl.removeFromCollection
)
router.post('/chakras/:id/collection', isLoggedIn, collectionCtrl.create)
router.get('/chakras/:id/collections', isLoggedIn, collectionCtrl.index)
router.post('/crystals/:id/collection', isLoggedIn, collectionCtrl.create)
router.get('/crystals/:id/collections', isLoggedIn, collectionCtrl.index)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/oauth/google')
}
module.exports = router
