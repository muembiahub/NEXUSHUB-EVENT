const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  comment: {
    type: String
  }
}, { timestamps: true });

// Static methods used by reviewsController
reviewSchema.statics.getAllReviews = function() {
  return this.find().populate('userId', '-password').populate('eventId');
};

reviewSchema.statics.getReviewById = function(id) {
  return this.findById(id).populate('userId', '-password').populate('eventId');
};

reviewSchema.statics.createReview = function(reviewData) {
  return this.create(reviewData);
};

reviewSchema.statics.updateReview = function(id, updateData) {
  return this.findByIdAndUpdate(id, updateData, { new: true });
};

reviewSchema.statics.deleteReview = function(id) {
  return this.findByIdAndDelete(id);
};

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
