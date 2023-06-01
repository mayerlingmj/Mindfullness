const Chakra = require('../models/chakra')
const User = require('../models/user')
module.exports = {
  create
}
async function create(req, res) {
  const chakra = await Chakra.findById(req.params.id)
  chakra.crystals.push(req.body)
  chakra.save()
  res.redirect(`/chakras/${chakra._id}`)
}
