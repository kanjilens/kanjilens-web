import type {
  AuthContextType,
  AuthState,
  AuthProvider,
  LoginCredentials,
  RegisterData,
} from "@features/iam/types";
import { useCallback, useEffect } from "react";

import type { RefObject } from "react";
import type { AuthContextActions } from "@features/iam/context/AuthContext";
import type { UnknownError } from "@shared/types";

interface UseAuthProviderProps {
  provider: AuthProvider;

  actions: AuthContextActions;

  state: AuthState;

  stateRef: RefObject<AuthState>;
}

export function useAuthProvider({
  provider,
  actions,
}: UseAuthProviderProps): Pick<
  AuthContextType,
  "login" | "logout" | "register" | "resetPassword"
> {
  useEffect(() => {
    actions.loading(true);

    provider.initialize();

    const unsubscribe = provider.onAuthStateChanged(
      async (user) => {
        if (!user) {
          actions.initialize({
            isAuthenticated: false,
            user: null,
          });

          actions.setToken(null);

          actions.loading(false);

          return;
        }

        const token = await provider.getAccessToken();

        actions.setToken(token);

        actions.initialize({
          isAuthenticated: true,
          user,
        });

        actions.loading(false);
      },
    );

    return unsubscribe;
  }, [provider, actions]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      actions.loginStart();

      try {
        await provider.login(credentials);

        return true;
      } catch (error) {
        console.error("Failed to log-in:", error);
        actions.loginFailure({
          message:
            "Credenciais inválidas, tente novamente mais tarde!",
        });

        return false;
      }
    },
    [provider, actions],
  );

  const logout = useCallback(async () => {
    await provider.logout();

    actions.logout();
  }, [provider, actions]);

  const register = useCallback(
    async (data: RegisterData) => {
      actions.loginStart();
      try {
        await provider.register(data);
      } catch (error) {
        actions.loginFailure(error as UnknownError);
      }
    },
    [provider, actions],
  );

  const resetPassword = useCallback(
    async (email: string) => {
      actions.loginStart();
      try {
        await provider.resetPassword(email);
      } catch (error) {
        actions.loginFailure(error as UnknownError);
      }
    },
    [provider, actions],
  );

  return {
    login,
    logout,
    register,
    resetPassword,
  };
}
