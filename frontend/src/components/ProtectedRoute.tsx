import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Show loading state while checking authentication
    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;


// import { ReactNode } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// interface ProtectedRouteProps {
//     children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//     const { isAuthenticated } = useAuth();

//     if (!isAuthenticated) {
//         return <Navigate to="/login" />;
//     }

//     return <>{children}</>;
// };

// export default ProtectedRoute;
