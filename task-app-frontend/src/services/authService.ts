import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";
export const registerUser = async (username: string, password: string) => {
    return axios.post(`${API_URL}/register`, { username, password });
};

export const loginUser = async (username: string, password: string) => {
    return axios.post(`${API_URL}/login`, { username, password });
};
