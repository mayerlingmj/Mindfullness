const router = require('express').Router()
const chakraCtrl = require('../controllers/chakras')
const isLoggedIn = require('../config/isLoggedin')
router.get('/chakras', chakraCtrl.index)
router.get('/chakras/new', isLoggedIn, chakraCtrl.new)
router.post('/chakras', isLoggedIn, chakraCtrl.create)
router.get('/chakras/:id', chakraCtrl.show)
router.post('/chakras/:id', isLoggedIn, chakraCtrl.addToCollection)

module.exports = router
