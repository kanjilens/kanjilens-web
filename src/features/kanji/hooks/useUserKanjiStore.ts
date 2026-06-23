import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  KanjiStatus,
  type UserKanji,
  type UserKanjiRepository,
} from "@features/kanji/types";

export interface UseUserKanjiStore {
  userKanjis: UserKanji[];

  loading: boolean;

  get(kanji: string): UserKanji | undefined;
  save(data: UserKanji): Promise<void>;
  update(data: UserKanji): Promise<void>;
  remove(kanji: string): Promise<void>;

  updateStatus(
    kanji: string,
    status: KanjiStatus,
  ): Promise<void>;
  addNote(kanji: string, text: string): Promise<void>;
  removeNote(kanji: string, noteId: string): Promise<void>;
}

export function useUserKanjiStore(
  repository: UserKanjiRepository | null,
  ready: boolean,
): UseUserKanjiStore {
  const [userKanjis, setUserKanjis] = useState<UserKanji[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready || !repository) {
      return;
    }

    const unsubscribe = repository.subscribe((items) => {
      setUserKanjis(items);
      setLoading(false);
    });

    return unsubscribe;
  }, [repository, ready]);

  const get = useCallback(
    (kanji: string) =>
      userKanjis.find((k) => k.kanji === kanji),
    [userKanjis],
  );

  const save = useCallback(
    async (data: UserKanji) => {
      if (!repository) return;

      await repository.save(data);
    },
    [repository],
  );

  const update = useCallback(
    async (data: UserKanji) => {
      if (!repository) return;

      await repository.update(data);
    },
    [repository],
  );

  const remove = useCallback(
    async (kanji: string) => {
      if (!repository) return;

      await repository.delete(kanji);
    },
    [repository],
  );

  const updateStatus = useCallback(
    async (
      kanji: string,
      status: KanjiStatus | undefined,
    ) => {
      const current = get(kanji);

      if (!current) return;

      await update({
        ...current,
        status,
      });
    },
    [get, update],
  );

  const addNote = useCallback(
    async (kanji: string, text: string) => {
      const current = get(kanji);

      if (!current) return;

      await update({
        ...current,
        notes: [
          ...current.notes,
          {
            id: crypto.randomUUID(),
            text,
            createdAt: new Date(),
          },
        ],
      });
    },
    [get, update],
  );

  const removeNote = useCallback(
    async (kanji: string, noteId: string) => {
      const current = get(kanji);
      if (!current) return;

      await update({
        ...current,
        notes: current.notes.filter((n) => n.id !== noteId),
      });
    },
    [get, update],
  );

  return useMemo(
    () => ({
      userKanjis,
      loading,

      get,
      save,
      update,
      remove,

      updateStatus,
      addNote,
      removeNote,
    }),
    [
      userKanjis,
      loading,
      get,
      save,
      update,
      remove,
      updateStatus,
      addNote,
      removeNote,
    ],
  );
}
