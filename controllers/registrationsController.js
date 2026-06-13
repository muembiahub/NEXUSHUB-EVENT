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


const createRegistration = async (req, res) => {
  try {
    const { userId, eventId, status } = req.body;

    // REQUIRED FIELDS
    if (!userId || !eventId) {
      return res.status(400).json({
        error: "userId and eventId are required"
      });
    }

    // VALID OBJECT IDS
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(eventId)
    ) {
      return res.status(400).json({
        error: "Invalid userId or eventId format"
      });
    }

    // CHECK USER + EVENT EXIST
    const user = await User.getUserById(userId);
    const event = await Event.getEventById(eventId);

    if (!user || !event) {
      return res.status(400).json({
        error: "Invalid userId or eventId"
      });
    }

    // CHECK STATUS VALIDATION
    const allowedStatus = ["registered", "attended", "cancelled"];
    const finalStatus = status || "registered";

    if (!allowedStatus.includes(finalStatus)) {
      return res.status(400).json({
        error: "Invalid status value"
      });
    }

    const registration = await Registration.create({
      userId,
      eventId,
      status: finalStatus,
      registeredAt: new Date()
    });

    res.status(201).json({
      message: "Registration created successfully",
      registration
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, eventId, status } = req.body;

    // VALID ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid registration ID" });
    }

    // REQUIRED FIELDS (STRICT like validator)
    if (!userId || !eventId) {
      return res.status(400).json({
        error: "userId and eventId are required"
      });
    }

    // VALID OBJECT IDS
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(eventId)
    ) {
      return res.status(400).json({
        error: "Invalid userId or eventId format"
      });
    }

    // CHECK USER + EVENT EXIST
    const user = await User.getUserById(userId);
    const event = await Event.getEventById(eventId);

    if (!user || !event) {
      return res.status(400).json({
        error: "Invalid userId or eventId"
      });
    }

    // STATUS VALIDATION (IMPORTANT)
    const allowedStatus = ["registered", "attended", "cancelled"];

    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        error: "Invalid status value"
      });
    }

    // FIND AND UPDATE
    const registration = await Registration.findByIdAndUpdate(
      id,
      {
        userId,
        eventId,
        status
      },
      {
        new: true,
        runValidators: true
      }
    ).populate("userId", "-password")
     .populate("eventId");

    if (!registration) {
      return res.status(404).json({
        error: "Registration not found"
      });
    }

    res.status(200).json({
      message: "Registration updated successfully",
      registration
    });

  } catch (error) {
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