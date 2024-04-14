import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/authContext"

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();
    console.log(loading, isAuthenticated);

    if (loading) {
        return <h1>loading ...</h1>;
    } else {
        if (!isAuthenticated) {
            return <Navigate to="/" replace />;
        } else {
            return <Outlet />;
        }
    }
}

export default ProtectedRoute;
