var express = require('express')
var router = express.Router()
const passport = require('passport')

// The root route renders our only view
router.get('/', function (req, res) {
  res.redirect('/login')
})
// Google OAuth login route
router.get(
  '/oauth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

module.exports = router
