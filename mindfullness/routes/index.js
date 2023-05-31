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
// Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/crystals',
    successRedirect: '/chakras',
    failureRedirect: '/login'
  })
)

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

module.exports = router
