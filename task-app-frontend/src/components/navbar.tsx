import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../contexts/authContext";

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const location = useLocation();

    if (location.pathname === "/login" || location.pathname === "/register") return null;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/tasks">Task Manager</Link>
                <div>
                    <button className="btn btn-danger" onClick={authContext?.logout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
