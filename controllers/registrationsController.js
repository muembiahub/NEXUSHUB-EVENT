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
    const user = await User.getUserById(userId);
    const event = await eventsModel.getEventById(eventId);

    if (!user || !event) {
      return res.status(400).json({ error: 'Invalid userId or eventId' });
    }

    const registration = await registrationsModel.createRegistration(req.body);
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRegistration = async (req, res) => {
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

    const registration = await registrationsModel.updateRegistration(req.params.id, req.body);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json(registration);
  } catch (error) {
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
