import type { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRole?: string[];
};

const ProtectedRouteWrapper = ({
  allowedRole,
}: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();

  if (loading || currentUser === undefined) {
    return (
      <div className="absolute left-0 w-full top-[15%] h-[70%] flex items-center justify-center z-50">
        <div
          className="w-12 h-12 border-4 border-[#0F766E] border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }
  if (
    !currentUser ||
    (allowedRole &&
      !allowedRole.some((role) =>
        currentUser.roles?.includes(role),
      ))
  ) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default ProtectedRouteWrapper;
