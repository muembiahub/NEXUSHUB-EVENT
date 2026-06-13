const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String
  }
}, { timestamps: true });

// Static methods used by eventsController
eventSchema.statics.getAllEvents = function() {
  return this.find();
};

eventSchema.statics.getEventById = function(id) {
  return this.findById(id);
};

eventSchema.statics.createEvent = function(eventData) {
  return this.create(eventData);
};

eventSchema.statics.updateEvent = function(id, updateData) {
  return this.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

eventSchema.statics.deleteEvent = function(id) {
  return this.findByIdAndDelete(id);
};

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
