import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  // We only care about `user` and `isLoading` now
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // 1. Wait for the backend /me check to finish
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="animate-pulse text-sm font-medium text-zinc-500">
          Verifying secure session...
        </span>
      </div>
    );
  }

  // 2. Not Authenticated? Boot them to login.
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // 3. Role-Based Access Control (RBAC)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // 4. Access Granted!
  return children ? <>{children}</> : <Outlet />;
}
