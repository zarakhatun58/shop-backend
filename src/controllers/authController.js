const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validatePassword = (password) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
};

// Check for global shop name uniqueness
const isShopNameUnique = async (shops) => {
  const allUsers = await User.find();
  const usedShopNames = allUsers.flatMap(user => user.shops);
  return shops.every(name => !usedShopNames.includes(name));
};

exports.signup = async (req, res) => {
  const { username, password, shops } = req.body;

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password too weak' });
  }

  if (shops.length < 3) {
    return res.status(400).json({ message: 'Minimum 3 shop names required' });
  }

  if (!await isShopNameUnique(shops)) {
    return res.status(400).json({ message: 'One or more shop names are already taken' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, shops });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  const { username, password, remember } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: remember ? '7d' : '30m'
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: remember ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000,
    domain: '.localhost',
    sameSite: 'lax',
  });

  res.json({ message: 'Signin successful' });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('username shops');
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.logout = async (_req, res) => {
  res.clearCookie('token', { domain: '.localhost', httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Logged out' });
};
