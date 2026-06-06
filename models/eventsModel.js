const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
    minlength: [3, 'Event name must be at least 3 characters long'],
    maxlength: [100, 'Event name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    default: '',
    trim: true,
    maxlength: [1000, 'Event description cannot exceed 1000 characters'],
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true,
    maxlength: [200, 'Event location cannot exceed 200 characters'],
  },
  capacity: {
    type: Number,
    default: 0,
    min: [0, 'Capacity cannot be negative'],
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
const updateEvent = (id, data) => Event.findByIdAndUpdate(id, data, { new: true, runrequireAuths: true });
const deleteEvent = (id) => Event.findByIdAndDelete(id);

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
