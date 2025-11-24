import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // If NOT logged in → redirect to signin
  if (!user) {
    toast.error("Please Login!");
    return <Navigate to="/signin" replace />;
    
  }

  
  return <Outlet />;
};

export default ProtectedRoute;
