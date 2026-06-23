import {
  type ReactNode,
  useReducer,
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
} from "react";
import type { AuthState } from "../types";
import {
  authReducer,
  initialState,
} from "../state/auth.reducer";
import { useToast } from "@shared/hooks/useToast";
import { createAuthenticationProvider } from "@features/iam/utils/provider";
import { AuthContext } from "../context/AuthContext";
import { Toast } from "@components/ui/Global/Toast";

import * as actionCreators from "@features/iam/state/auth.actions";
import { useAuthProvider } from "@features/iam/hooks/useAuthProvider";
import type { AuthUser } from "@features/iam/types";
import type { UnknownError } from "@shared/types";
import type { AuthContextActions } from "@features/iam/context/AuthContext";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  const stateRef = useRef<AuthState>(state);

  useLayoutEffect(() => {
    stateRef.current = state;
  });

  const { messages, addToast, removeToast, handleError } =
    useToast(state.error);

  const actions: AuthContextActions = useMemo(
    () => ({
      initialize: (payload) =>
        dispatch(actionCreators.initialize(payload)),

      loginStart: () =>
        dispatch(actionCreators.loginStart()),

      loginSuccess: (payload) =>
        dispatch(actionCreators.loginSuccess(payload)),

      loginFailure: (payload) =>
        dispatch(
          actionCreators.loginFailure(
            payload as UnknownError,
          ),
        ),

      logout: () => dispatch(actionCreators.logout()),

      loading: (payload) =>
        dispatch(actionCreators.loading(payload)),

      refreshTokenStart: () =>
        dispatch(actionCreators.refreshTokenStart()),

      refreshTokenSuccess: (payload) =>
        dispatch(
          actionCreators.refreshTokenSuccess(payload),
        ),

      refreshTokenFailure: () =>
        dispatch(actionCreators.refreshTokenFailure()),

      setCurrentUser: (payload) =>
        dispatch(actionCreators.setCurrentUser(payload)),

      setToken: (payload) =>
        dispatch(actionCreators.setToken(payload)),

      resetError: () =>
        dispatch(actionCreators.resetError()),
    }),
    [],
  );

  const provider = useMemo(
    () => createAuthenticationProvider(),
    [],
  );

  const { login, logout, register, resetPassword } =
    useAuthProvider({
      provider,
      actions,
      state,
      stateRef,
    });

  useEffect(() => {
    const error = state.error as
      | (UnknownError & {
          code?: string;
        })
      | null;

    if (error?.code === "ERR_NETWORK") {
      const intervalId = setInterval(() => {
        actions.logout();
        actions.resetError();
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [state.error, actions]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        provider,
        user: state.currentUser as AuthUser | null,
        actions,
        login,
        logout,
        resetPassword,
        register,
        messages,
        addToast,
        removeToast,
        handleError,
      }}
    >
      {children}

      <div className="fixed bottom-4 right-4 z-50 flex w-[320px] flex-col gap-2">
        {messages.map((toast) => (
          <Toast
            key={toast.id}
            status={toast.status}
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </AuthContext.Provider>
  );
}
