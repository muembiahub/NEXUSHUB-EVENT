const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  comment: {
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

reviewSchema.index({ userId: 1, eventId: 1 }, { unique: true });

reviewSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = this.updatedAt;
  }
  next();
});

reviewSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

const getAllReviews = () => Review.find();
const getReviewById = (id) => Review.findById(id);
const createReview = (data) => Review.create(data);
const updateReview = (id, data) => Review.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const deleteReview = (id) => Review.findByIdAndDelete(id);

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
