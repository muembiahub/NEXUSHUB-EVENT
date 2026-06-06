const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  organization: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Custom wrapper methods expected by registrations and reviews controllers
userSchema.statics.getUserById = function(id) {
  return this.findById(id);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
