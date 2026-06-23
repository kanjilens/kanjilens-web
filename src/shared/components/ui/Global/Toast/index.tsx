import { Typography } from "@components/ui/Typography";
import { useEffect, useState } from "react";

export type ToastStatus = "success" | "error" | "warning";

export type ToastMessage = {
  id: number;
  message: string;
  status: ToastStatus;
  duration?: number;
};

interface ToastProps {
  message: string;
  status: ToastStatus;
  onClose?: () => void;
  mode?: "bar" | "text";
  duration?: number;
}
export const Toast = ({
  message,
  status,
  onClose,
  mode = "bar",
  duration = 3,
}: ToastProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const durationMs = duration * 1000;
    const start = performance.now();
    let animationFrameId = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(durationMs - elapsed, 0);
      setTimeLeft(remaining / 1000);

      if (remaining <= 0 && onClose) {
        onClose();
        return;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [duration, onClose]);

  const toastStyles: Record<ToastStatus, string> = {
    success: "bg-[#F0FDFA] text-[#0F766E] border-[#D1FAE5]",
    error: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
    warning: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
  };

  const progress = Math.max(0, (timeLeft / duration) * 100);

  return (
    <div
      className={`w-full p-4 border rounded-[16px] shadow-sm ${toastStyles[status]}`}
    >
      <div className="flex items-center justify-between gap-4">
        <Typography
          variant="caption"
          as={"span"}
          className="flex-1"
        >
          {message}
        </Typography>

        <div className="flex items-center gap-2 ml-4 shrink-0">
          {mode === "text" ? (
            <Typography variant="caption" as={"span"}>
              {timeLeft}s
            </Typography>
          ) : (
            <div className="w-24 h-2 bg-white/30 rounded overflow-hidden">
              <div
                className="h-full bg-current will-change-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <button
            aria-label="close"
            onClick={() => onClose && onClose()}
            className="flex justify-center rounded hover:bg-black/5"
          >
            <span className="material-symbols-outlined sm2">
              close
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
