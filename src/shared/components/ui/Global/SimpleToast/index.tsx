import { Typography } from "@components/ui/Typography";
import type { ToastStatus } from "../Toast";

interface SimpleToastProps {
  information: string;
  status: ToastStatus;
}

export const SimpleToast = ({
  information,
  status,
}: SimpleToastProps) => {
  const tipStyles: Record<ToastStatus, string> = {
    success:
      "bg-[#F0FDFA] text-[#0F766E] border-[#D1FAE5] leading-[20px]",
    error: "bg-[#D1FAE5] text-[#0F766E]",
    warning: "bg-[#D1FAE5] text-[#0F766E]",
  };
  return (
    <div
      className={`w-full p-4 border-1 rounded-[16px] items-center ${tipStyles[status]}`}
    >
      <Typography
        variant="caption"
        as={"span"}
        className=""
      >
        {information}
      </Typography>
    </div>
  );
};
