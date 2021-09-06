const mongoose = require('mongoose');

const fandfSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false
  },
  othersusername: {
    type: String,
    required: true,
    unique: false
  },
  status: {
    type: String,
    unique: false
  }
}, {timestamps: true});

mongoose.model('FandF', fandfSchema);