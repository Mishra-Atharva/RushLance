import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType"); // should be "client", "freelancer", or "admin"

  if (!token) return <Navigate to="/" replace />;
  if (userType !== allowedRole) {
    // Redirect to the correct dashboard
    if (userType === "client") return <Navigate to="/dashboard_client" replace />;
    if (userType === "freelancer") return <Navigate to="/dashboard_freelancer" replace />;
    if (userType === "admin") return <Navigate to="/dashboard_admin" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
