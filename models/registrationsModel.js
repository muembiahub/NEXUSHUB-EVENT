const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  status: {
    type: String,
    enum: ['registered', 'attended', 'cancelled'],
    default: 'registered'
  }
}, { timestamps: true });

// Static methods
registrationSchema.statics.getAllRegistrations = function() {
  return this.find()
    .populate('userId', '-password')
    .populate('eventId');
};

registrationSchema.statics.getRegistrationById = function(id) {
  return this.findById(id)
    .populate('userId', '-password')
    .populate('eventId');
};

registrationSchema.statics.createRegistration = function(registrationData) {
  return this.create(registrationData);
};

registrationSchema.statics.updateRegistration = function(id, updateData) {
  return this.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  })
    .populate('userId', '-password')
    .populate('eventId');
};

registrationSchema.statics.deleteRegistration = function(id) {
  return this.findByIdAndDelete(id);
};

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
//  