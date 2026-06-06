const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event ID is required'],
  },
  status: {
    type: String,
    enum: {
      values: ['registered', 'attended', 'cancelled'],
      message: 'Status must be registered, attended, or cancelled',
    },
    default: 'registered',
    trim: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
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

registrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

registrationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = this.updatedAt;
  }
  next();
});

registrationSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Registration = mongoose.model('Registration', registrationSchema);

const getAllRegistrations = () => Registration.find();
const getRegistrationById = (id) => Registration.findById(id);
const createRegistration = (data) => Registration.create(data);
const updateRegistration = (id, data) => Registration.findByIdAndUpdate(id, data, { new: true, runrequireAuths: true });
const deleteRegistration = (id) => Registration.findByIdAndDelete(id);

module.exports = {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration,
};
