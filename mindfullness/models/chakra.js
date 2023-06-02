const mongoose = require('mongoose')
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const chakraSchema = new Schema(
  {
    name: {
      type: String
      // enum: [
      //   'THROAT',
      //   'CROWN',
      //   'HEART',
      //   'THIRD EYE',
      //   'SOLAR PLEXUS',
      //   'SACRAL',
      //   'ROOT'
      // ]
    }
  },

  {
    timestamps: true
  }
)

module.exports = mongoose.model('Chakra', chakraSchema)
