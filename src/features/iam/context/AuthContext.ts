import { createContext } from "react";

import type {
  AuthProvider,
  AuthState,
  AuthUser,
} from "@features/iam/types";
import type { UseToastReturn } from "@shared/hooks/useToast";
import type { UnknownError } from "@shared/types";

export type AuthContextActions = {
  initialize: (payload: {
    isAuthenticated: boolean;
    user: AuthUser | AuthUser | null;
  }) => void;
  loginStart: () => void;
  loginSuccess: (payload: { token: string }) => void;
  loginFailure: (payload: UnknownError) => void;
  logout: () => void;
  loading: (payload: boolean) => void;
  refreshTokenStart: () => void;
  refreshTokenSuccess: (payload: { token: string }) => void;
  refreshTokenFailure: () => void;
  setCurrentUser: (payload: AuthUser | null) => void;
  setToken: (payload: string | null) => void;
  resetError: () => void;
};

export interface AuthContextValue
  extends Partial<UseToastReturn>, AuthState {
  provider: AuthProvider;
  user: AuthUser | null;
  loading: boolean;
  login: AuthProvider["login"];
  logout: AuthProvider["logout"];
  register: AuthProvider["register"];
  resetPassword: AuthProvider["resetPassword"];
  actions: AuthContextActions;
}

export const AuthContext = createContext<AuthContextValue>(
  null!,
);
