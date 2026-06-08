import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    const parseToken = (token) => {
        try {
            const payload = token.split(".")[1];
            return JSON.parse(atob(payload));
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        const decoded = parseToken(token);

        if (!decoded) {
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
            setLoading(false);
            return;
        }

        setUser({
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name
        });

        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const res = await loginApi({ email, password });

        const jwt = res.data;

        localStorage.setItem("token", jwt);
        setToken(jwt);

        const decoded = parseToken(jwt);

        setUser({
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name
        });

        return decoded;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const isAdmin = () => user?.role === "ADMIN";
    const isCreator = () => user?.role === "CREATOR";
    const isAuthenticated = () => !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                isAdmin,
                isCreator,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
