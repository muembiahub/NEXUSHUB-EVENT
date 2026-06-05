const eventsModel = require('../models/eventsModel');

function getEvents(req, res) {
  try {
    res.json(eventsModel.getAllEvents());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getEvent(req, res) {
  try {
    const event = eventsModel.getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function createEvent(req, res) {
  try {
    const event = eventsModel.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function updateEvent(req, res) {
  try {
    const event = eventsModel.updateEvent(req.params.id, req.body);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function deleteEvent(req, res) {
  try {
    const event = eventsModel.deleteEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
