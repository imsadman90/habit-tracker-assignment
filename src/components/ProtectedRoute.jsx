
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }) => {
      const { user, loading } = useContext(AuthContext);
      const location = useLocation();

      if (loading) return <p className="text-center mt-10">Loading...</p>;

      if (!user) {
            return <Navigate to="/login" state={{ from: location }} replace />;
      }

      return children;
};

export default ProtectedRoute;