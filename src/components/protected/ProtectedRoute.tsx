import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token: string | null = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/admin/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;
