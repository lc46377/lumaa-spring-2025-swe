import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
    const [user, setUser] = useState({ username: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await registerUser(user.username, user.password);
            navigate("/login");
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="p-4 border rounded shadow-sm w-50" onSubmit={handleSubmit}>
                <h2 className="text-center">Register</h2>
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                    <input type="text" name="username" placeholder="Username" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" name="confirmPassword" placeholder="Re-enter Password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
                <div className="text-center mt-3">
                    <p>Already have an account?</p>
                    <Link to="/login" className="btn btn-outline-secondary">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
