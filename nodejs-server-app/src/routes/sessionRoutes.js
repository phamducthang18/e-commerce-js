const express = require('express');
const SessionController = require('../controllers/sessionController');
const checkSession = require('../middleware/checkSession'); // Optional if you want to protect this route

const router = express.Router();
const sessionController = new SessionController();

// Check session route
router.get('/session/check', (req, res) => sessionController.checkSession(req, res));

// Logout route
router.post('/session/logout', (req, res) => sessionController.logout(req, res));

module.exports = router;