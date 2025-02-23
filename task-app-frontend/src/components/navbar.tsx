import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext";

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [logoutMessage, setLogoutMessage] = useState("");

    if (location.pathname === "/login" || location.pathname === "/register") return null;

    const handleLogout = () => {
        setLogoutMessage("You have successfully logged out!");

        setTimeout(() => {
            setLogoutMessage("");
            authContext?.logout();
            navigate("/login");
        }, 2000);
    };

    return (
        <>
            {logoutMessage && (
                <div className="alert alert-success text-center position-fixed top-0 start-0 w-100" style={{ zIndex: 1050 }}>
                    {logoutMessage}
                </div>
            )}

            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">
                    <Link className="navbar-brand" to="/tasks">Task Manager</Link>
                    <div>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
