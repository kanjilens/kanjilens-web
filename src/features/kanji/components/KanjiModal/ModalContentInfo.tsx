import { Typography } from "@components/ui/Typography";
import type { PropsWithChildren } from "react";

export const ModalContentInfo = ({
  label,
  children,
}: { label: string } & PropsWithChildren) => (
  <div
    className="flex min-w-0 flex-col gap-1 mb-4 max-w-full"
    tabIndex={0}
  >
    <Typography variant="label">{label}</Typography>
    <div className="flex w-full flex-wrap gap-1 items-start overflow-hidden whitespace-normal">
      {children}
    </div>
  </div>
);
