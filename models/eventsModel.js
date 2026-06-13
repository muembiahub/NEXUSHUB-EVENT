const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      required: [true, 'Event date is required']
    },
    location: {
      type: String,
      default: ''
    },
    capacity: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

eventSchema.statics.getAllEvents = function () {
  return this.find().sort({ date: 1 });
};

eventSchema.statics.getEventById = function (id) {
  return this.findById(id);
};

eventSchema.statics.createEvent = function (eventData) {
  return this.create(eventData);
};

eventSchema.statics.updateEvent = function (id, updateData) {
  return this.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

eventSchema.statics.deleteEvent = function (id) {
  return this.findByIdAndDelete(id);
};

module.exports = mongoose.model('Event', eventSchema);