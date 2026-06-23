import { useMemo } from "react";

import { useAuth } from "@features/iam/hooks/useAuth";
import { createUserKanjiRepository } from "@features/kanji/utils/repository";

export function useKanjiRepository() {
  const { currentUser, isAuthenticated } = useAuth();

  return useMemo(() => {
    if (!isAuthenticated || !currentUser) {
      return {
        repository: null,
        ready: false,
      };
    }

    return {
      repository: createUserKanjiRepository(
        currentUser.uid,
      ),
      ready: true,
    };
  }, [currentUser, isAuthenticated]);
}
