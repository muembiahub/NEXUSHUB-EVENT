const mongoose = require('mongoose');
const Registration = require('../models/registrationsModel');
const User = require('../models/usersModel');
const Event = require('../models/eventsModel');

// GET ALL
const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.getAllRegistrations();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ONE
const getRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid registration ID' });
    }

    const registration = await Registration.getRegistrationById(id);

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE (STRICT)
const createRegistration = async (req, res) => {
  try {
    const { userId, eventId, status } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({
        error: 'userId and eventId are required'
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(eventId)
    ) {
      return res.status(400).json({
        error: 'Invalid userId or eventId format'
      });
    }

    const user = await User.getUserById(userId);
    const event = await Event.getEventById(eventId);

    if (!user || !event) {
      return res.status(400).json({
        error: 'Invalid userId or eventId'
      });
    }

    const existing = await Registration.findOne({ userId, eventId });

    if (existing) {
      return res.status(409).json({
        error: 'Registration already exists for this user and event'
      });
    }

    const registration = await Registration.createRegistration({
      userId,
      eventId,
      status: status || 'registered'
    });

    res.status(201).json({
      message: 'Registration created successfully',
      registration
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE (STRICT SAME AS CREATE)
const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, eventId, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid registration ID' });
    }

    // REQUIRED (same as CREATE)
    if (!userId || !eventId || !status) {
      return res.status(400).json({
        error: 'userId, eventId and status are required'
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(eventId)
    ) {
      return res.status(400).json({
        error: 'Invalid userId or eventId format'
      });
    }

    const user = await User.getUserById(userId);
    const event = await Event.getEventById(eventId);

    if (!user || !event) {
      return res.status(400).json({
        error: 'Invalid userId or eventId'
      });
    }

    const registration = await Registration.updateRegistration(id, {
      userId,
      eventId,
      status
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.status(200).json({
      message: 'Registration updated successfully',
      registration
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate registration conflict'
      });
    }

    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.deleteRegistration(id);

    if (!registration) {
      return res.status(404).json({
        error: 'Registration not found'
      });
    }

    res.status(200).json({
      message: 'Registration deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRegistrations,
  getRegistration,
  createRegistration,
  updateRegistration,
  deleteRegistration
};