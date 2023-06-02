const Crystal = require('../models/crystal')
const Chakra = require('../models/chakra')

module.exports = {
  index,
  new: newCrystal,
  create,
  show,
  delete: deleteCrystal
}
async function index(req, res) {
  const crystals = await Crystal.find()
  res.render('crystals/index', { crystals })
}

function newCrystal(req, res) {
  res.render('crystals/new', { title: 'New Crystal' })
}

async function create(req, res) {
  const crystal = await Crystal.create(req.body)
  console.log(crystal)
  res.redirect('/crystals')
}

async function show(req, res) {
  const crystal = await Crystal.findById(req.params.id).populate('chakras')
  const chakras = await Chakra.find({ _id: { $nin: crystal.chakras } }).sort(
    'name'
  )
  console.log(chakras)
  res.render('crystals/show', { title: 'More About', crystal, chakras })
}
async function deleteCrystal(req, res) {
  const crystal = await Crystal.findByIdAndRemove(req.params.id)
  console.log(crystal)
  res.redirect('/crystals')
}
