import useAdmin from "@/Hooks/useAdmin";
import useAuth from "@/Hooks/useAuth";
import Loading from "@/Shared/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;