var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
// session middleware
var passport = require('passport')
const session = require('express-session')
const indexRoutes = require('./routes/index')
const chakraRoutes = require('./routes/chakras')
const crystalRoutes = require('./routes/crystals')
const collectionRoutes = require('./routes/collections')

require('dotenv').config()

// create the Express app
const app = express()

// connect to the MongoDB with mongoose
require('./config/database')
// configure Passport
require('./config/passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  session({
    secret: 'SEI Group 1 Rocks!',
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

// mount all routes with appropriate base paths
app.use('/', indexRoutes)
app.use('/', crystalRoutes)
app.use('/', collectionRoutes)

// invalid request, send 404 page
app.use(function (req, res) {
  res.status(404).send('Cant find that!')
})

module.exports = app
