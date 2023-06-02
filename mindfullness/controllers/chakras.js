const Chakra = require('../models/chakra')
const Crystal = require('../models/crystal')
module.exports = {
  add,
  new: newChakra,
  create
}

async function newChakra(req, res) {
  const chakras = await Chakra.find({}).sort('name')
  res.render('chakras/new', { title: 'New Chakra', chakras })
}

async function create(req, res) {
  const chakra = await Chakra.create(req.body)
  console.log('CHAKRA', req.body)
  res.redirect('/crystals')
}

async function add(req, res) {
  const crystal = await Crystal.findById(req.params.id)
  crystal.chakras.push(req.body.chakraId)
  await crystal.save()
  res.redirect('/crystals')
}
