const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  pinId: {
    type: Schema.Types.ObjectId,
    ref: 'pins'
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'boards'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
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
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('items', ItemSchema);
