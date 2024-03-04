const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bookmark: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bookmark' 
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
