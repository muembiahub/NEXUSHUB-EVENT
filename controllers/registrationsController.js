const mongoose = require('mongoose');
const registrationsModel = require('../models/registrationsModel');
const User = require('../models/usersModel');
const eventsModel = require('../models/eventsModel');

const getRegistrations = async (req, res) => {
  try {
    const registrations = await registrationsModel.getAllRegistrations();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRegistration = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid registration ID' });
    }
    const registration = await registrationsModel.getRegistrationById(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRegistration = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: 'Invalid userId or eventId format' });
    }
    const user = await User.getUserById(userId);
    const event = await eventsModel.getEventById(eventId);

    if (!user || !event) {
      return res.status(400).json({ error: 'Invalid userId or eventId' });
    }

    const existingRegistration = await registrationsModel.findOne({ userId, eventId });
    if (existingRegistration) {
      return res.status(409).json({ error: 'A registration for this user and event already exists.' });
    }

    const registration = await registrationsModel.createRegistration(req.body);
    res.status(201).json({message: 'Registration created successfully', registration});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const { userId, eventId, status } = req.body;

    // Validate registration ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid registration ID' });
    }

    // Validate userId if provided
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid userId format' });
      }

      const user = await User.getUserById(userId);
      if (!user) {
        return res.status(400).json({ error: 'Invalid userId' });
      }
    }

    // Validate eventId if provided
    if (eventId) {
      if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: 'Invalid eventId format' });
      }

      const event = await eventsModel.getEventById(eventId);
      if (!event) {
        return res.status(400).json({ error: 'Invalid eventId' });
      }
    }

    // Build FULL update object (like CREATE)
    const updateData = {
      userId,
      eventId,
      status: status || 'registered'
    };

    // Remove undefined fields (important)
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const registration = await registrationsModel.updateRegistration(
      req.params.id,
      updateData
    );

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.json({
      message: 'Registration updated successfully',
      registration
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate registration for same user and event'
      });
    }

    res.status(500).json({ error: error.message });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const registration = await registrationsModel.deleteRegistration(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRegistrations,
  getRegistration,
  createRegistration,
  updateRegistration,
  deleteRegistration,
};
