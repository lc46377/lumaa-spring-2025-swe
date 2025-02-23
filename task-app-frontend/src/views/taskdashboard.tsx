import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/authContext";
import { getTasks, addTask, updateTask, deleteTask } from "../services/taskService";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskDashboard = () => {
    const authContext = useContext(AuthContext);
    const token = authContext?.token || "";
    const [tasks, setTasks] = useState<
        { id: string; title: string; description: string; is_complete: boolean }[]
    >([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [completionMessage, setCompletionMessage] = useState("");

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

    const handleToggleComplete = async (taskId: string, is_complete: boolean) => {
        try {
            const task = tasks.find((task) => task.id === taskId);
            if (!task) return;

            await updateTask(token, taskId, { is_complete });

            fetchTasks();


            if (is_complete) {
                setCompletionMessage(`🎉 You completed: "${task.title}"!`);
                setTimeout(() => setCompletionMessage(""), 3000);
            }
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

            {/* Completion Message */}
            {completionMessage && <div className="alert alert-success">{completionMessage}</div>}

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
                            <span className={task.is_complete ? "text-decoration-line-through text-success fw-bold" : ""}>
                                {task.title} - {task.description}
                            </span>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskDashboard;
