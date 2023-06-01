const mongoose = require('mongoose')

//need to have many different crystals belonging to many users

const crystalSchema = new mongoose.Schema({
  name: String,
  color: String,
  description: String,
  image: String,
  userCreated: { type: mongoose.Schema.Types.ObjectId },
  usersAddedToCollection: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'crystal' }
  ]
})

module.exports = mongoose.model('Crystal', crystalSchema)
