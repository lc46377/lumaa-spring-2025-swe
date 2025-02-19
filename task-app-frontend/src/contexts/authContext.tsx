import { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        const checkTokenExpiration = () => {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) return;

            const payload = JSON.parse(atob(storedToken.split(".")[1])); // Decode JWT payload
            const expiry = payload.exp * 1000;
            if (Date.now() >= expiry) {
                logout();
            }
        };

        checkTokenExpiration();
    }, []);

    const login = (jwtToken: string) => {
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
