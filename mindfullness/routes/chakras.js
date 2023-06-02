var express = require('express')
const router = require('express').Router()
const chakrasCtrl = require('../controllers/chakras')
const isLoggedIn = require('../config/isLoggedin')
router.get('/chakras/new', chakrasCtrl.new)
router.post('/chakras', chakrasCtrl.create)
router.post('/crystals/:id/chakras', chakrasCtrl.add)

module.exports = router
