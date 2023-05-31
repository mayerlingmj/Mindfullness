const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  chakrasAdded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chakra' }]
})

module.exports = mongoose.model('Collection', collectionSchema)
