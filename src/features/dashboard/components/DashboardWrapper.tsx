import type { PropsWithChildren } from "react";

export const DashboardWrapper = ({
  backgroundImage = "",
  internalClassname = "",
  backgroundColor = "",
  smallPadding = "p-0",
  children,
}: {
  backgroundImage?: string;
  backgroundColor?: string;
  internalClassname?: string;
  smallPadding?: string;
} & PropsWithChildren) => {
  return (
    <div
      className={`w-full h-full flex flex-row ${smallPadding} md:p-[32px] overflow-auto ${internalClassname}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: `${backgroundColor}`,
      }}
    >
      <div className="w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};
