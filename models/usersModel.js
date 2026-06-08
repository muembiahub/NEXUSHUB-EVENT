const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  organization: {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// 🔒 Hash password before saving
userSchema.pre('save', async function () {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = this.updatedAt;
  }

  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Update timestamp on update
userSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

// 🔑 Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static helper
userSchema.statics.getUserById = function (id) {
  return this.findById(id);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
