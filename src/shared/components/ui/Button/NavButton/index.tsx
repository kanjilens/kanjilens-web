import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export const NavButton = ({
  children,
  icon,
  onClick,
  disabled,
  link,
  as = "link",
}: PropsWithChildren & {
  to?: string;
  icon: string;
  as?: "button" | "link";
  onClick?: () => void;
  disabled: boolean;
  link?: string;
  current?: string;
}) => {
  const urlPath = window.location.pathname;
  const isActive = urlPath === link;

  const baseClasses =
    "flex items-center w-full gap-2 rounded-md px-3 py-2 text-sm font-normal text-[#0A0A0A] transition-colors hover:bg-[#055f61] hover:text-white";
  const activeClasses = "bg-[#077a7d] text-white";
  if (as === "link" && link) {
    return (
      <Link
        to={link}
        className={`${baseClasses} ${isActive ? activeClasses : ""} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
        onClick={disabled ? undefined : onClick}
      >
        <span className="material-symbols-outlined md">
          {icon}
        </span>
        <p className="text-[16px]">{children}</p>
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={`${baseClasses} ${isActive ? activeClasses : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="material-symbols-outlined primary md">
        {icon}
      </span>
      <p>{children}</p>
    </button>
  );
};
