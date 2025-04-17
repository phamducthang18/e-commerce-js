const express = require('express');
const UserModel = require('../models/userModel');
const UserController = require('../controllers/userController');
const checkSession = require('../middleware/checkSession'); // Import the middleware

const setUserRoutes = (app) => {
    const router = express.Router();
    const userController = new UserController(UserModel); // Pass UserModel here

    // User CRUD routes
    router.post('/users', userController.createUser.bind(userController));
    router.get('/users/:id', userController.getUser.bind(userController));
    router.put('/users/:id', userController.updateUser.bind(userController));
    router.delete('/users/:id', userController.deleteUser.bind(userController));

    // Authentication routes
    router.post('/signup', (req, res) => userController.signup(req, res));
    router.post('/signin', (req, res) => userController.signin(req, res));
    router.get('/profile', checkSession, (req, res) => userController.profile(req, res)); // Protect the profile route

    app.use('/api', router);
};

module.exports = setUserRoutes;