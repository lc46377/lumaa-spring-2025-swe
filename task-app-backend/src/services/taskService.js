const db = require('../config/database');

const getAllTasks = async (userId) => {
    const result = await db.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    return result.rows;
};

const createTask = async (userId, title, description) => {
    const result = await db.query(
        'INSERT INTO tasks (user_id, title, description, is_complete) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, title, description, false]
    );
    return result.rows[0];
};

const updateTask = async (taskId, userId, title, description, isComplete) => {
    const result = await db.query(
        'UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
        [title, description, isComplete, taskId, userId]
    );
    return result.rows[0];
};

const deleteTask = async (taskId, userId) => {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id', [taskId, userId]);
    return result.rowCount > 0;
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
