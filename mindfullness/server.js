var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var methodOverride = require('method-override')
// session middleware
var passport = require('passport')
const session = require('express-session')
const indexRoutes = require('./routes/index')
const chakraRoutes = require('./routes/chakras')
const crystalRoutes = require('./routes/crystals')
const createError = require('http-errors')

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
app.use(methodOverride('_method'))
app.use(
  session({
    secret: 'Group 1 Is The Bomb!',
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
app.use('/', chakraRoutes)
app.use('/', crystalRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
module.exports = app
