import { Routes as RouterRoutes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            {/* Add other routes as needed */}
        </RouterRoutes>
    );
};

export default Routes;
