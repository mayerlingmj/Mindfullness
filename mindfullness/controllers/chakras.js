const Chakra = require('../models/chakra')
const User = require('../models/user')

module.exports = {
  index,
  new: newChakra,
  create,
  show,
  deleteChakra
}
async function index(req, res) {
  const chakras = await Chakra.find()
  res.render('chakras/home', { chakras })
}

function newChakra(req, res) {
  res.render('chakras/new', { title: 'New Chakra' })
}

async function create(req, res) {
  const chakra = await Chakra.create(req.body)
  console.log(chakra)
  res.redirect('/chakras')
}

async function show(req, res) {
  const chakra = await Chakra.findById(req.params.id)
  console.log(chakra)
  res.render('chakras/show', { title: 'More About', chakra })
}
async function deleteChakra(req, res, next) {
  const chakra = await Chakra.findById(req.params.id)
  console.log(chakra)
  res.render('chakras/delete')
}
