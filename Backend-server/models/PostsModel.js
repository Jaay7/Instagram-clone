const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false
  },
  postImage: {
    type: String,
    required: true,
    unique: false
  },
  postCaption: {
    type: String,
    unique: false
  },
  postLocation: {
    type: String,
    unique: false
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
}, {timestamps: true});

mongoose.model('Posts', postsSchema);