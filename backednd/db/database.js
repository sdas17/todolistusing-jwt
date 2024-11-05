const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { User, Todo };
