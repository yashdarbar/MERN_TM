import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";
import api from "../config/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();

    // Debug: Log authentication state changes
    useEffect(() => {
        console.log("Auth state changed:", { isAuthenticated });

        // Debug: Check stored token
        const token = localStorage.getItem("token");
        console.log("Stored token exists:", !!token);
    }, [isAuthenticated]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            console.log("Attempting login for email:", email);

            const { data } = await api.post("/api/auth/login", {
                email,
                password,
            });

            console.log("Login response received:", {
                hasToken: !!data.token,
                tokenPreview: data.token
                    ? `${data.token.slice(0, 20)}...`
                    : null,
            });

            if (data.token) {
                login(data.token);

                // Debug: Verify token is stored
                const storedToken = localStorage.getItem("token");
                console.log("Token stored successfully:", !!storedToken);

                // Debug: Make a test request
                try {
                    const testResponse = await api.get("/api/tasks");
                    console.log("Test request successful:", {
                        status: testResponse.status,
                        headers: testResponse.config?.headers,
                    });
                } catch (testError: any) {
                    console.error("Test request failed:", {
                        status: testError.response?.status,
                        message: testError.response?.data?.message,
                        headers: testError.config?.headers,
                    });
                }

                navigate("/dashboard");
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "Login failed";
            console.error("Login error:", {
                status: error.response?.status,
                message: errorMessage,
                details: error.response?.data,
            });
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="bg-green-50 text-green-700 border-green-200">
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full"
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full"
                                disabled={loading}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        <div className="text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="text-blue-500 hover:text-blue-600"
                            >
                                Sign up here
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
