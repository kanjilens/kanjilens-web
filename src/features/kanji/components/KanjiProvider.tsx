import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { useKanjiRepository } from "@features/kanji/hooks/useKanjiRepository";
import { KanjiContext } from "@features/kanji/context/kanjiContext";
import { KanjiModal } from "@features/kanji/components/KanjiModal";
import { useUserKanjiStore } from "../hooks/useUserKanjiStore";
import { useKanjiCollection } from "../hooks/useKanjiCollection";
import { useGlobalToast } from "@features/iam/hooks/useGlobalToast";
import { KanjiCategory, KanjiStatus } from "../types";

export function KanjiProvider({
  children,
}: PropsWithChildren) {
  const { repository, ready } = useKanjiRepository();

  const kanjiStore = useUserKanjiStore(repository, ready);

  const {
    kanjis,
    loading,
    error,
    get,
    save,
    update,
    remove,
    updateStatus,
    addNote,
    removeNote,
  } = useKanjiCollection(kanjiStore);

  const { addToast } = useGlobalToast();

  const [selectedId, setSelectedId] = useState<
    string | null
  >(null);

  const openKanji = (kanji: string) => {
    setSelectedId(kanji);
  };

  const closeKanji = () => {
    setSelectedId(null);
  };

  const handleAddKanji = useCallback(
    async (kanji: string) => {
      if (!kanji || !save) return;
      try {
        const newuserKanji = {
          kanji: kanji,
          addedAt: new Date(),
          status: KanjiStatus.NEW,
          category: KanjiCategory.KANJI,
          notes: [],
        };
        await save(newuserKanji);
        addToast?.("Kanji adicionado", "success");
      } catch (err: any) {
        addToast?.(
          err?.message || "Erro ao adicionar kanji",
          "error",
        );
      }
    },
    [addToast, save],
  );

  const value = useMemo(
    () => ({
      kanjis,
      loading,

      get,
      save,
      update,
      remove,

      updateStatus,
      addNote,
      removeNote,

      openKanji,
      closeKanji,

      handleAddKanji,
    }),
    [
      kanjis,
      loading,
      get,
      save,
      update,
      updateStatus,
      handleAddKanji,
      addNote,
      remove,
      removeNote,
    ],
  );

  useEffect(() => {
    if (error && addToast) {
      error.forEach((err) =>
        addToast(err.message, "error"),
      );
    }
  }, [error, addToast]);

  return (
    <KanjiContext.Provider value={value}>
      {children}
      <KanjiModal
        open={selectedId !== null}
        kanjiId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </KanjiContext.Provider>
  );
}
