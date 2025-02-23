const db = require('../config/database');

const getAllTasks = async (userId) => {
    const result = await db.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    return result.rows;
};

const getTaskById = async (taskId, userId) => {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
    return result.rows[0];
};

const createTask = async (userId, title, description) => {
    const result = await db.query(
        'INSERT INTO tasks (user_id, title, description, is_complete) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, title, description, false]
    );
    return result.rows[0];
};

const updateTask = async (taskId, userId, title, description, is_complete) => {
    const result = await db.query(
        `UPDATE tasks 
         SET title = COALESCE($1, title), 
             description = COALESCE($2, description), 
             is_complete = $3
         WHERE id = $4 AND user_id = $5 
         RETURNING *`,
        [title, description, is_complete, taskId, userId]
    );
    return result.rows[0];
};

const deleteTask = async (taskId, userId) => {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id', [taskId, userId]);
    return result.rowCount > 0;
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
