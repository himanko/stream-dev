import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // 1. Check if the user has a VIP pass (the JWT token)
  const token = localStorage.getItem("authToken");

  // 2. If they don't have a token, instantly redirect them to login.
  // The 'replace' prop ensures they can't hit the "Back" button to bypass this.
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  // 3. If they do have a token, render the protected page they asked for
  return <Outlet />;
}
