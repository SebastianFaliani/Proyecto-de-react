import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function ProtectedRoute() {
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}
