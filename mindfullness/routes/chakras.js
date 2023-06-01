var express = require('express')
const router = require('express').Router()
const chakrasCtrl = require('../controllers/chakras')
const isLoggedIn = require('../config/isLoggedin')
router.get('/', chakrasCtrl.index)
router.get('/new', chakrasCtrl.new)
router.get('/:id', chakrasCtrl.show)
router.post('/', chakrasCtrl.create)

module.exports = router
