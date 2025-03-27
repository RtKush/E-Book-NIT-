
const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/authController');

// Import middlewares
const { authenticate } = require('../middlewares/auth');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.get('/user', authenticate, authController.getUser);

module.exports = router;
