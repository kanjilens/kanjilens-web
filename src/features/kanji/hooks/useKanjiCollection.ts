import { useCallback, useEffect, useMemo } from "react";

import { KanjiMapper } from "@features/kanji/utils/kanji.mapper";

import { useKanjiDetails } from "./useKanjiDetails";
import { type UseUserKanjiStore } from "./useUserKanjiStore";
import type { Kanji } from "@features/kanji/types";

export function useKanjiCollection(
  userKanjiStore: UseUserKanjiStore,
) {
  const {
    details,
    loading: detailsLoading,
    errors,
    loadByIds,
    failedIds,
  } = useKanjiDetails();

  useEffect(() => {
    if (detailsLoading || (errors?.length ?? 0) > 0) {
      return;
    }
    const missing = userKanjiStore.userKanjis.filter(
      (k) =>
        !details.has(k.kanji) &&
        !failedIds.current.has(k.kanji),
    );

    if (missing.length === 0) {
      return;
    }

    loadByIds(missing.map((k) => k.kanji));
  }, [
    userKanjiStore.userKanjis,
    details,
    detailsLoading,
    errors?.length,
    failedIds,
    loadByIds,
  ]);

  const kanjis = useMemo(() => {
    return userKanjiStore.userKanjis
      .map((user) => {
        const detail = details.get(user.kanji);

        if (!detail) return null;

        return KanjiMapper.mergeUser(detail, user);
      })
      .filter(Boolean) as Kanji[];
  }, [userKanjiStore.userKanjis, details]);

  const get = useCallback(
    (id: string) => kanjis.find((k) => k.kanji === id),
    [kanjis],
  );

  return {
    kanjis,
    loading: userKanjiStore.loading || detailsLoading,
    error: errors,
    get,
    getUserKanji: userKanjiStore.get,
    save: userKanjiStore.save,
    update: userKanjiStore.update,
    remove: userKanjiStore.remove,
    updateStatus: userKanjiStore.updateStatus,
    addNote: userKanjiStore.addNote,
    removeNote: userKanjiStore.removeNote,
  };
}
