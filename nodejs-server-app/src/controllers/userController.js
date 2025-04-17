const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();


class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async signup(req, res) {
        try {
            const { username, email, password } = req.body;
            
            const existingUser = await UserModel.findByEmail(email);          
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = await UserModel.create ({ username, email, password: hashedPassword });

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    // Signin function
    async signin(req, res) {
        
        try {
            const { email, password } = req.body;
            
            // Check if the user exists
            const user = await UserModel.findByEmail(email);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            // Store user information in the session
            req.session.user = {
                id: user.id,
                email: user.email,
                username: user.username,
            };
            
            res.status(200).json({ message: 'Login successful' ,user:{
                id: user._id,
                username: user.username,
                email: user.email,
                created_at: user.created_at,
            }});
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }

    async logout(req, res) {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error logging out', error: err });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    }

    async createUser(req, res) {
        try {
            const newUser = new this.userModel(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const user = await this.userModel.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await this.userModel.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async profile(req, res) {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: "Chưa đăng nhập" });
            }
            const user = await this.userModel.findById(req.session.user.id); // Use this.userModel
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }
            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                created_at: user.created_at,
            });
        } catch (error) {
            console.log('Error getting user profile:', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;
