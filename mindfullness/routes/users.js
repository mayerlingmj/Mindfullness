var express = require('express')
var router = express.Router()
var usersCtrl = require('../controllers/users')

router.get('/login', usersCtrl.index)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
