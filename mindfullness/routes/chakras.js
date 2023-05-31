const router = require('express').Router()
const chakraCtrl = require('../controllers/chakras')

router.get('/chakras', chakraCtrl.index)
router.get('/chakras/new', isLoggedIn, chakraCtrl.new)
router.post('/chakras', isLoggedIn, chakraCtrl.create)
router.get('/chakras/:id', chakraCtrl.show)
router.post('/chakras/:id', isLoggedIn, chakraCtrl.addToCollection)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/oauth/google')
}

module.exports = router
