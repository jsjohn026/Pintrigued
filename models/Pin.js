const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'boards'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Pin = mongoose.model('pins', PinSchema);