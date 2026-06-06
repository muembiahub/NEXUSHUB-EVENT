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
    const { userId, eventId, rating } = req.body;
    const user = await User.getUserById(userId);
    const event = await eventsModel.getEventById(eventId);

    if (!user || !event) {
      return res.status(400).json({ error: 'Invalid userId or eventId' });
    }

    if (rating !== undefined && (rating < 0 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 0 and 5' });
    }

    const review = await reviewsModel.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    if (req.body.userId) {
      const user = await User.getUserById(req.body.userId);
      if (!user) {
        return res.status(400).json({ error: 'Invalid userId' });
      }
    }

    if (req.body.eventId) {
      const event = await eventsModel.getEventById(req.body.eventId);
      if (!event) {
        return res.status(400).json({ error: 'Invalid eventId' });
      }
    }

    if (req.body.rating !== undefined && (req.body.rating < 0 || req.body.rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 0 and 5' });
    }

    const review = await reviewsModel.updateReview(req.params.id, req.body);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
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
