import type {
  Kanji,
  KanjiStatus,
  UserKanji,
} from "@features/kanji/types";
import { createContext } from "react";

interface KanjiContextType {
  kanjis: Kanji[];
  loading: boolean;

  get: (id: string) => Kanji | undefined;
  save: (data: UserKanji) => Promise<void>;
  update: (data: UserKanji) => Promise<void>;
  remove(id: string): Promise<void>;

  removeNote(id: string, noteId: string): Promise<void>;
  addNote(id: string, text: string): Promise<void>;

  updateStatus(
    id: string,
    status: KanjiStatus | undefined,
  ): Promise<void>;

  openKanji: (kanji: string) => void;
  closeKanji: () => void;
  handleAddKanji: (kanji: string) => void;
}

export const KanjiContext = createContext<KanjiContextType>(
  null!,
);
