import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/authContext";

const Navbar = () => {
    const authContext = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/tasks">Task Manager</Link>
                <div>
                    {authContext?.token ? (
                        <button className="btn btn-danger" onClick={authContext.logout}>Logout</button>
                    ) : (
                        <Link className="btn btn-primary me-2" to="/login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
