var express = require('express')
var router = express.Router()
const passport = require('passport')

// The root route renders our only view
router.get('/', function (req, res) {
  res.redirect('/chakras')
})
// Google OAuth login route
router.get(
  '/oauth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
// Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/chakras',
    failureRedirect: '/chakras'
  })
)

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/chakras')
})

module.exports = router
