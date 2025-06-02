const express = require('express');
const router = express.Router();
const { signup, signin, getProfile, logout } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', verifyToken, getProfile);
router.post('/logout', logout);

module.exports = router;
