// src/components/Layout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GuestNavbar, Navbar } from "../Navbar";
import { useAuth } from "@features/iam/hooks/useAuth";

interface LayoutProps {
  children?: React.ReactNode;
  guestUser?: boolean;
}

const Layout = ({ guestUser = false }: LayoutProps) => {
  const route = window.location.pathname;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (route === "/") navigate("/home");
  }, [route, navigate]);

  return (
    <div id="layout">
      <div
        id="inner"
        className="flex flex-col justify-between"
      >
        <div
          id="content"
          className={
            isAuthenticated
              ? "flex flex-row w-[100%] items-start"
              : "flex flex-col md:flex-row w-[100%] items-start"
          }
        >
          {guestUser ? <GuestNavbar /> : <Navbar />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
