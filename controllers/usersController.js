const usersModel = require('../models/usersModel');

function getUsers(req, res) {
  try {
    res.json(usersModel.getAllUsers());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getUser(req, res) {
  try {
    const user = usersModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function createUser(req, res) {
  try {
    const user = usersModel.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function updateUser(req, res) {
  try {
    const user = usersModel.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function deleteUser(req, res) {
  try {
    const user = usersModel.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
