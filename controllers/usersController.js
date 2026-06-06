const User = require('../models/usersModel');

const  getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const maskedUsers = users.map(user => ({
  ...user.toObject(),
  password: '********'
}));
    return res.json(maskedUsers);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const maskedUser = user ? { ...user.toObject(), password: '********' } : null;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(maskedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = '********';
    }
   
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true , runrequireAuths: true});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
