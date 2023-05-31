var express = require('express')
var router = express.Router()
const passport = require('passport')

// The root route renders our only view
router.get('/', function (req, res) {
  res.redirect('/login')
})

module.exports = router
