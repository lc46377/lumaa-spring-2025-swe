import axios from "axios";

const API_URL = "http://localhost:5001/api/tasks"; // Update with your backend URL

export const getTasks = async (token: string) => {
    return axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const addTask = async (
    token: string,
    taskData: { title: string; description: string }
) => {
    return axios.post(API_URL, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateTask = async (
    token: string,
    taskId: string,
    updatedTask: { title: string; description: string; is_complete: boolean }
) => {
    return axios.put(`${API_URL}/${taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteTask = async (token: string, taskId: string) => {
    return axios.delete(`${API_URL}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
