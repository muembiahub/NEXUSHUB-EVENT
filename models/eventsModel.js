const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    default: 0,
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

eventSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = this.updatedAt;
  }
  next();
});

eventSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Event = mongoose.model('Event', eventSchema);

const getAllEvents = () => Event.find();
const getEventById = (id) => Event.findById(id);
const createEvent = (data) => Event.create(data);
const updateEvent = (id, data) => Event.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const deleteEvent = (id) => Event.findByIdAndDelete(id);

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
