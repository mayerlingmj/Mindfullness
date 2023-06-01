const mongoose = require('mongoose')

//need to have many different chakras belonging to many users

const chakraSchema = new mongoose.Schema({
  name: String,
  color: String,
  description: String,
  image: String,
  userCreated: { type: mongoose.Schema.Types.ObjectId },
  usersAddedToCollection: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'chakra' }
  ],
  crystals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crystal' }]
})

module.exports = mongoose.model('Chakra', chakraSchema)
