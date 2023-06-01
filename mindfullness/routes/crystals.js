var router = require('express').Router()
const crystalCtrl = require('../controllers/crystals')
const isLoggedIn = require('../config/isLoggedin')
router.get('/crystals', crystalCtrl.index)
router.get('/login', crystalCtrl.index)
router.get('/crystals/new', isLoggedIn, crystalCtrl.new)
router.post('/crystals', isLoggedIn, crystalCtrl.create)
router.get('/crystals/:id', crystalCtrl.show)
router.post('/crystals/:id', isLoggedIn, crystalCtrl.addToCollection)

module.exports = router
