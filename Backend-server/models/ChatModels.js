const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    unique: false
  },
  receiver: {
    type: String,
    required: true,
    unique: false
  },
  message: {
    type: String,
    required: true,
    unique: false
  },
  isSeen: {
    type: Boolean,
    default: false,
    unique: false
  },
}, {timestamps: true});

mongoose.model('Chats', chatSchema);