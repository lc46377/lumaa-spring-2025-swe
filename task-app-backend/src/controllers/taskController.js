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
        const { title, description, is_complete } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        const existingTask = await taskService.getTaskById(id, req.user.userId);
        if (!existingTask) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        const updatedTask = await taskService.updateTask(
            id,
            req.user.userId,
            title !== undefined ? title : existingTask.title,
            description !== undefined ? description : existingTask.description,
            is_complete != null && is_complete !== undefined ? is_complete : existingTask.is_complete
        );

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
