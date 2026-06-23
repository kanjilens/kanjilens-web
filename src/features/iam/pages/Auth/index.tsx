import { DashboardWrapper } from "@features/dashboard/components/DashboardWrapper";
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { AuthToggle } from "@features/iam/components/AuthToggle";
import type { AuthPageRoutes } from "@features/iam/types";

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState<AuthPageRoutes>(
    location.pathname.includes("/register")
      ? "register"
      : "login",
  );

  const handleSelected = (value: "login" | "register") => {
    setSelected(value);
    navigate(value === "login" ? "/login" : "/register");
  };

  return (
    <DashboardWrapper
      internalClassname="w-[60%] md:w-full md:py-[0px]"
      backgroundColor="#eef2f1"
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-[#FFFFFFF2] flex h-full md:h-fit flex-col justify-center rounded-xl shadow-xl p-8 max-w-[448px] wrap">
          <div className="flex flex-col w-full mb-6">
            <AuthToggle
              selected={selected}
              setSelected={handleSelected}
            />
          </div>
          <Outlet />
        </div>
      </div>
    </DashboardWrapper>
  );
};
