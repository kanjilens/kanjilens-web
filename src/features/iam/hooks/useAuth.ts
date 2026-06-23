import { useContext } from "react";

import {
  AuthContext,
  type AuthContextValue,
} from "@features/iam/context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider",
    );
  }
  return context as AuthContextValue;
}
