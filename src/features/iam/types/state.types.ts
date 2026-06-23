// Supondo que estes tipos venham de uma pasta global /types ou de seus respectivos locais
import type { UnknownError } from "@shared/types";
import type {
  AuthUser,
  LoginCredentials,
  RegisterData,
} from "./auth.types";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isRefreshing: boolean;
  currentUser: AuthUser | null;
  loading: boolean;
  error: UnknownError | null;
  isInitialized: boolean;
}

export type AuthAction =
  | {
      type: "INITIALIZE";
      payload: {
        isAuthenticated: boolean;
        user: AuthUser | null;
      };
    }
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { token: string } }
  | { type: "LOGIN_FAILURE"; payload: UnknownError }
  | { type: "LOGOUT" }
  | { type: "REFRESH_TOKEN_START" }
  | {
      type: "REFRESH_TOKEN_SUCCESS";
      payload: { token: string };
    }
  | { type: "REFRESH_TOKEN_FAILURE" }
  | { type: "LOADING"; payload: boolean }
  | {
      type: "SET_CURRENT_USER";
      payload: AuthUser | null;
    }
  | { type: "SET_TOKEN"; payload: string | null }
  | { type: "RESET_ERROR" };

export interface AuthContextType extends AuthState {
  register: (data: RegisterData) => Promise<void>;
  login: (
    credentials: LoginCredentials,
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
