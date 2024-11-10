import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate(); // Now this will work as it's inside BrowserRouter
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const decodeToken = (token: string): User | null => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const payload = JSON.parse(window.atob(base64));
            return {
                id: payload.userId,
                email: payload.email,
            };
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = decodeToken(token);
            setUser(decodedUser);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token: string) => {
        const decodedUser = decodeToken(token);
        localStorage.setItem("token", token);
        setUser(decodedUser);
        setIsAuthenticated(true);
        navigate("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
        //console.log("logout");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
