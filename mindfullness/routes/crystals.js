const express = require('express')
const router = express.Router()
const crystalsCtrl = require('../controllers/crystals')

router.get('/crystals/new', crystalsCtrl.new)
router.post('/crystals', crystalsCtrl.create)
router.get('/crystals/', crystalsCtrl.index)
router.get('/crystals/:id', crystalsCtrl.show)
router.delete('/crystals/:id', crystalsCtrl.delete)

module.exports = router
