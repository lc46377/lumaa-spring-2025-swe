// backend/src/controllers/taskController.js
const taskService = require('../services/taskService');

const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks(req.user.userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || title.trim() === '') {
            return res.status(400).json({ message: 'Title is required' });
        }
        const newTask = await taskService.createTask(req.user.userId, title, description);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isComplete } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        const updatedTask = await taskService.updateTask(id, req.user.userId, title, description, isComplete);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        const deleted = await taskService.deleteTask(id, req.user.userId);
        if (!deleted) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
