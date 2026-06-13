const mongoose = require('mongoose');
const reviewsModel = require('../models/reviewsModel');
const User = require('../models/usersModel');
const eventsModel = require('../models/eventsModel');

const getReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel.getAllReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReview = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid review ID' });
    }
    const review = await reviewsModel.getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { userId, eventId, rating, comment } = req.body;

    if (!userId || !eventId || rating === undefined) {
      return res.status(400).json({ error: 'userId, eventId, and rating are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: 'Invalid userId or eventId format' });
    }

    const user = await User.getUserById(userId);
    const event = await eventsModel.getEventById(eventId);

    if (!user || !event) {
      return res.status(400).json({ error: 'Invalid userId or eventId' });
    }

    const existingReview = await reviewsModel.findOne({ userId, eventId });
    if (existingReview) {
      return res.status(409).json({ error: 'A review for this user and event already exists. Use PUT to update it.' });
    }

    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be a number between 0 and 5' });
    }

    const reviewData = { userId, eventId, rating, comment };
    const review = await reviewsModel.createReview(reviewData);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.userId) {
      if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
        return res.status(400).json({ error: 'Invalid userId format' });
      }
      const user = await User.getUserById(req.body.userId);
      if (!user) {
        return res.status(400).json({ error: 'Invalid userId' });
      }
      updateData.userId = req.body.userId;
    }

    if (req.body.eventId) {
      if (!mongoose.Types.ObjectId.isValid(req.body.eventId)) {
        return res.status(400).json({ error: 'Invalid eventId format' });
      }
      const event = await eventsModel.getEventById(req.body.eventId);
      if (!event) {
        return res.status(400).json({ error: 'Invalid eventId' });
      }
      updateData.eventId = req.body.eventId;
    }

    if (req.body.rating !== undefined) {
      if (typeof req.body.rating !== 'number' || req.body.rating < 0 || req.body.rating > 5) {
        return res.status(400).json({ error: 'Rating must be a number between 0 and 5' });
      }
      updateData.rating = req.body.rating;
    }

    if (req.body.comment !== undefined) {
      updateData.comment = req.body.comment;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid review ID' });
    }
    const review = await reviewsModel.updateReview(req.params.id, updateData);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Review update conflicts with an existing review for the same user and event.' });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid review ID' });
    }
    const review = await reviewsModel.deleteReview(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
