const registrationsModel = require('../models/registrationsModel');
const usersModel = require('../models/usersModel');
const eventsModel = require('../models/eventsModel');

function getRegistrations(req, res) {
  try {
    res.json(registrationsModel.getAllRegistrations());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getRegistration(req, res) {
  try {
    const registration = registrationsModel.getRegistrationById(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function createRegistration(req, res) {
  try {
    const { userId, eventId } = req.body;
    if (!usersModel.getUserById(userId) || !eventsModel.getEventById(eventId)) {
      return res.status(400).json({ error: 'Invalid userId or eventId' });
    }

    const registration = registrationsModel.createRegistration(req.body);
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function updateRegistration(req, res) {
  try {
    if (req.body.userId && !usersModel.getUserById(req.body.userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    if (req.body.eventId && !eventsModel.getEventById(req.body.eventId)) {
      return res.status(400).json({ error: 'Invalid eventId' });
    }

    const registration = registrationsModel.updateRegistration(req.params.id, req.body);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function deleteRegistration(req, res) {
  try {
    const registration = registrationsModel.deleteRegistration(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getRegistrations,
  getRegistration,
  createRegistration,
  updateRegistration,
  deleteRegistration,
};
