var router = require('express').Router()
const crystalCtrl = require('../controllers/crystals')

router.get('/crystals', crystalCtrl.index)
router.get('/crystals/new', isLoggedIn, crystalCtrl.new)
router.post('/crystals', isLoggedIn, crystalCtrl.create)
router.get('/crystals/:id', crystalCtrl.show)
router.post('/crystals/:id', isLoggedIn, crystalCtrl.addToCollection)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/oauth/google')
}

module.exports = router
