import { useContext } from "react";
import { AuthContext } from "@features/iam/context/AuthContext";
import type { UseToastReturn } from "@shared/hooks/useToast";

export function useGlobalToast() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalToast must be used within an useGlobalToast",
    );
  }
  return context as UseToastReturn;
}
