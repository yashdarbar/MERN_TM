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
    loading: boolean; // Add loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Add loading state

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

    // Verify token validity
    const isTokenValid = (token: string): boolean => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const payload = JSON.parse(window.atob(base64));

            // Check if token has expired
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        } catch {
            return false;
        }
    };

    // Initialize auth state
    useEffect(() => {
        const initializeAuth = () => {
            const token = localStorage.getItem("token");

            if (token && isTokenValid(token)) {
                const decodedUser = decodeToken(token);
                setUser(decodedUser);
                setIsAuthenticated(true);
            } else {
                // Clear invalid token
                localStorage.removeItem("token");
                setUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = (token: string) => {
        const decodedUser = decodeToken(token);
        localStorage.setItem("token", token);
        setUser(decodedUser);
        setIsAuthenticated(true);
        navigate("/dashboard"); // Redirect to dashboard after login
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
    };

    // Show loading state while checking authentication
    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

