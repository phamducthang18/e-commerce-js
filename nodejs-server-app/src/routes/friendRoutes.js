const express = require('express');
const FriendController = require('../controllers/friendController');
const checkSession = require('../middleware/checkSession');

const setUserRoutes = (app) => {
    // Middleware to check session
    app.use(checkSession);

    const router = express.Router();
    const friendController = new FriendController();

    // Friend routes
    router.post('/friends/request', (req, res) => friendController.sendFriendRequest(req, res));
    router.put('/friends/request/:id', (req, res) => friendController.respondToFriendRequest(req, res));
    router.get('/friends/requests', (req, res) => friendController.listFriendRequests(req, res));
    router.get('/friends', (req, res) => friendController.listFriends(req, res));

    app.use('/api', router);
}

module.exports = setUserRoutes;