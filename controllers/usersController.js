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
      return res.status(404).json({ error: 'User not found with given ID' });
    }
    return res.json(maskedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const createUser = async (req, res) => {
  try {
    const createData = {
      name: req.body.name,
      email: req.body.email,
      organization: req.body.organization,
      role: req.body.role,
      password: req.body.password,
    };
    const newUser = await User.create(createData);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('+password');
    if (!user) {
      return res.status(404).json({ error: 'User not found with given ID' });
    }

    if (req.body.name !== undefined) user.name = req.body.name;
    if (req.body.email !== undefined) user.email = req.body.email;
    if (req.body.organization !== undefined) user.organization = req.body.organization;
    if (req.body.role !== undefined) user.role = req.body.role;
    if (req.body.password !== undefined) user.password = req.body.password;

    await user.save();
    const userObject = user.toObject();
    delete userObject.password;
    return res.json(userObject);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found with given ID' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
