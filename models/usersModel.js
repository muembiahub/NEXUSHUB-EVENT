const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  organization: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = this.updatedAt;
  }
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

userSchema.statics.getUserById = function (id) {
  return this.findById(id);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
