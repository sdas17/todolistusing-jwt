const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Todo } = require('../db/database');
const authenticateJWT = require('../middlware/dumy');
const router = express.Router();
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password }); // Store password as plain text (not recommended)
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
// Login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) { 
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});
// Create a new todo item (requires authentication)
router.post('/todos', authenticateJWT, async (req, res) => {
    const { title, description } = req.body;

    try {
        const newTodo = new Todo({
            title,
            description,
            userId: req.user.userId
        });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
});

// Get all todos for the authenticated user
router.get('/todos', authenticateJWT, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
});
module.exports = router;
