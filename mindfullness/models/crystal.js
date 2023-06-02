const mongoose = require('mongoose')
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const crystalSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    image: String,
    chakras: [{ type: Schema.Types.ObjectId, ref: 'Chakra' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Crystal', crystalSchema)
