const mongoose = require('mongoose');
const Event = require('../models/eventsModel');

const getEvents = async (req, res) => {
  try {
    const events = await Event.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
    const event = await Event.getEventById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { name, description, date, location, capacity } = req.body;
    if (!name || !date) {
      return res.status(400).json({ error: 'Name and date are required' });
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    const event = await Event.createEvent({
      name: name.trim(),
      description,
      date: parsedDate,
      location,
      capacity
    });
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const updateData = {};
    if (req.body.name !== undefined) {
      if (!req.body.name.trim()) {
        return res.status(400).json({ error: 'Name cannot be empty' });
      }
      updateData.name = req.body.name.trim();
    }
    if (req.body.date !== undefined) {
      const parsedDate = new Date(req.body.date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
      updateData.date = parsedDate;
    }
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.location !== undefined) updateData.location = req.body.location;
    if (req.body.capacity !== undefined) {
      const capacityNum = Number(req.body.capacity);
      if (isNaN(capacityNum) || capacityNum < 0) {
        return res.status(400).json({ error: 'Capacity must be a non‑negative number' });
      }
      updateData.capacity = capacityNum;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid fields provided' });
    }

    const event = await Event.updateEvent(id, updateData);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
    const event = await Event.deleteEvent(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};