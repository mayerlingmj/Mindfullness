const express = require('express')
const router = express.Router()
const crystalsCtrl = require('../controllers/crystals')

router.post('/chakras/:id/crystals', crystalsCtrl.create)

module.exports = router
