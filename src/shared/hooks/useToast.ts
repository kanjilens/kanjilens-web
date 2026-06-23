import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  ToastMessage,
  ToastStatus,
} from "@components/ui/Global/Toast";

export interface UseToastReturn {
  messages: ToastMessage[];
  addToast: (message: string, status: ToastStatus) => void;
  removeToast: (id: number) => void;
  handleError: (error: unknown) => void;
}

export const useToast = (
  error?: unknown,
): UseToastReturn => {
  const [messages, setMessages] = useState<ToastMessage[]>(
    [],
  );
  const timeouts = useRef<
    Map<number, ReturnType<typeof setTimeout>>
  >(new Map());
  const lastErrorMessageRef = useRef<
    ToastMessage | string | null
  >(null);
  const MAX_TOASTS = 3;

  const removeToast = (id: number) => {
    setMessages((current) =>
      current.filter((toast) => toast.id !== id),
    );
    const t = timeouts.current.get(id);
    if (t) {
      clearTimeout(t);
      timeouts.current.delete(id);
    }
  };
  const addToast = useCallback(
    (
      message: string,
      status: ToastStatus,
      duration: number = 3,
    ) => {
      const id = Date.now() + Math.random();

      setMessages((current) => {
        if (
          current.some(
            (t) =>
              t.message === message &&
              t.status === status &&
              current.length > 3,
          )
        ) {
          return current;
        }

        let next = [
          ...current,
          { id, message, status, duration },
        ];
        if (next.length > MAX_TOASTS) {
          const [oldest, ...rest] = next;
          const oldestTimeout = timeouts.current.get(
            oldest.id,
          );
          if (oldestTimeout) {
            clearTimeout(oldestTimeout);
            timeouts.current.delete(oldest.id);
          }
          next = rest;
        }

        return next;
      });

      const timeout = setTimeout(() => {
        setMessages((cur) =>
          cur.filter((t) => t.id !== id),
        );
        timeouts.current.delete(id);
      }, 3000);
      timeouts.current.set(id, timeout);
    },
    [],
  );

  const handleError = useCallback(
    (error: unknown) => {
      const message =
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (error as { message?: string })?.message;

      if (message) {
        lastErrorMessageRef.current = message;
        addToast(message, "error");
      }

      if (!message) {
        lastErrorMessageRef.current = null;
      }
    },
    [addToast],
  );

  useEffect(() => {
    const timeoutsRef = timeouts.current;
    return () => {
      timeoutsRef.forEach((t) => clearTimeout(t));
      timeoutsRef.clear();
    };
  }, []);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
    return () => {
      lastErrorMessageRef.current = null;
      setMessages((current) =>
        current.filter((t) => t.status !== "error"),
      );
    };
  }, [error, handleError]);

  return { messages, addToast, removeToast, handleError };
};
