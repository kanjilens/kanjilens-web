import {
  useCallback,
  useRef,
  useState,
  type RefObject,
} from "react";

import type {
  Kanji,
  KanjiApiModel,
} from "@features/kanji/types";
import { KanjiMapper } from "@features/kanji/utils/kanji.mapper";
import { kanjiService } from "@features/kanji/services/kanji.service";

interface UseKanjiDetailsResult {
  loading: boolean;
  errors: Error[] | null;
  details: Map<string, Kanji>;
  failedIds: RefObject<Set<string>>;
  loadByIds(ids: string[]): Promise<void>;
  loadByList(name: string, limit?: number): Promise<void>;
}

export function useKanjiDetails(): UseKanjiDetailsResult {
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState<Error[] | null>(null);

  const [details, setDetails] = useState(
    new Map<string, Kanji>(),
  );

  const loadingIds = useRef(new Set<string>());
  const failedIds = useRef(new Set<string>());

  const loadByIds = useCallback(
    async (ids: string[]) => {
      const idsToLoad = ids.filter(
        (id) =>
          !details.has(id) &&
          !loadingIds.current.has(id) &&
          !failedIds.current.has(id),
      );

      if (idsToLoad.length === 0) {
        return;
      }

      idsToLoad.forEach((id) => loadingIds.current.add(id));

      setLoading(true);
      setError(null);

      try {
        const data = await Promise.all(
          idsToLoad.map(async (id) => {
            const response = await kanjiService.getById(id);

            if (!response.ok) {
              failedIds.current.add(id);
              throw new Error(`Kanji ${id} não encontrado`);
            }

            return KanjiMapper.fromApi(
              (await response.value) as KanjiApiModel,
            );
          }),
        );

        setDetails((previous) => {
          const map = new Map(previous);

          data.filter(Boolean).forEach((kanji) => {
            map.set(kanji!.kanji, kanji!);
          });

          return map;
        });
      } catch (err) {
        console.error("Request Error", err);
        idsToLoad.forEach((id) =>
          failedIds.current.add(id),
        );
        setError((prev) => [...(prev ?? []), err as Error]);
      } finally {
        idsToLoad.forEach((id) =>
          loadingIds.current.delete(id),
        );
        setLoading(false);
      }
    },
    [details],
  );

  const loadByList = useCallback(
    async (listName: string, limit = 30) => {
      const response = await kanjiService.getById(listName);

      if (!response.ok) {
        return;
      }
      const ids = response.value as string[];

      await loadByIds(ids.slice(0, limit));
    },
    [loadByIds],
  );

  return {
    details,
    loading,
    errors,
    failedIds,
    loadByIds,
    loadByList,
  };
}
