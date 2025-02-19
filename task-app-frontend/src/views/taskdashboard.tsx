import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/authContext";
import { getTasks, addTask, updateTask, deleteTask } from "../services/taskService";

const TaskDashboard = () => {
    const authContext = useContext(AuthContext);
    const token = authContext?.token || "";
    const [tasks, setTasks] = useState<
        { id: string; title: string; description: string; is_complete: boolean }[]
    >([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [editTask, setEditTask] = useState<{ id: string; title: string; description: string } | null>(null);

    useEffect(() => {
        if (token) {
            fetchTasks();
        }
    }, [token]);

    const fetchTasks = async () => {
        try {
            const response = await getTasks(token);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    const handleAddTask = async () => {
        if (!newTask.title.trim() || !newTask.description.trim()) return;
        try {
            await addTask(token, newTask);
            setNewTask({ title: "", description: "" });
            fetchTasks();
        } catch (error) {
            console.error("Error adding task", error);
        }
    };

    const handleEditTask = async () => {
        if (!editTask) return;
        try {
            await updateTask(token, editTask.id, {
                title: editTask.title,
                description: editTask.description,
                is_complete: tasks.find((t) => t.id === editTask.id)?.is_complete || false,
            });
            setEditTask(null);
            fetchTasks();
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    const handleToggleComplete = async (taskId: string, isComplete: boolean) => {
        try {
            const task = tasks.find((task) => task.id === taskId);
            if (!task) return;
            await updateTask(token, taskId, {
                title: task.title,
                description: task.description,
                is_complete: isComplete,
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTask(token, taskId);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-3">Task Dashboard</h2>

            {/* ADD TASK */}
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <button className="btn btn-primary" onClick={handleAddTask}>
                    Add Task
                </button>
            </div>

            {/* EDIT TASK */}
            {editTask && (
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={editTask.title}
                        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={editTask.description}
                        onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                    />
                    <button className="btn btn-success" onClick={handleEditTask}>
                        Save Changes
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditTask(null)}>
                        Cancel
                    </button>
                </div>
            )}

            {/* TASK LIST */}
            <ul className="list-group">
                {tasks.map((task) => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                checked={task.is_complete}
                                onChange={() => handleToggleComplete(task.id, !task.is_complete)}
                            />
                            <span className={task.is_complete ? "text-decoration-line-through" : ""}>
                                {task.title} - {task.description}
                            </span>
                        </div>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => setEditTask(task)}>
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskDashboard;
