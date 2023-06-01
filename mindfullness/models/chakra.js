const mongoose = require('mongoose')
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const crystalSchema = new Schema(
  {
    crystal: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const chakraSchema = new Schema(
  {
    location: {
      type: String,
      enum: [
        'THROAT',
        'CROWN',
        'HEART',
        'THIRD EYE',
        'SOLAR PLEXUS',
        'SACRAL',
        'ROOT'
      ]
    }
  },
  {
    crystals: [crystalSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Chakra', chakraSchema)
