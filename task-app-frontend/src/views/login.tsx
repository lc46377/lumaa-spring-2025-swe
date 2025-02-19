import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import { loginUser } from "../services/authService";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginUser(credentials.username, credentials.password);
            if (authContext) authContext.login(response.data.token);
            navigate("/tasks");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="p-4 border rounded shadow-sm w-50" onSubmit={handleSubmit}>
                <h2 className="text-center">Login</h2>
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                    <input type="text" name="username" placeholder="Username" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <div className="text-center mt-3">
                    <p>Don't have an account?</p>
                    <Link to="/register" className="btn btn-outline-secondary">Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
