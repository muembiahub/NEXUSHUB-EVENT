const reviewsModel = require('../models/reviewsModel');
const usersModel = require('../models/usersModel');
const eventsModel = require('../models/eventsModel');

function getReviews(req, res) {
  try {
    res.json(reviewsModel.getAllReviews());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getReview(req, res) {
  try {
    const review = reviewsModel.getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function createReview(req, res) {
  try {
    const { userId, eventId, rating } = req.body;
    if (!usersModel.getUserById(userId) || !eventsModel.getEventById(eventId)) {
      return res.status(400).json({ error: 'Invalid userId or eventId' });
    }

    if (rating !== undefined && (rating < 0 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 0 and 5' });
    }

    const review = reviewsModel.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function updateReview(req, res) {
  try {
    if (req.body.userId && !usersModel.getUserById(req.body.userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    if (req.body.eventId && !eventsModel.getEventById(req.body.eventId)) {
      return res.status(400).json({ error: 'Invalid eventId' });
    }

    if (req.body.rating !== undefined && (req.body.rating < 0 || req.body.rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 0 and 5' });
    }

    const review = reviewsModel.updateReview(req.params.id, req.body);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function deleteReview(req, res) {
  try {
    const review = reviewsModel.deleteReview(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
