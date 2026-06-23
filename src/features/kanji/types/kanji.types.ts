import type { Repository } from "@shared/types/db/repository.types";

export interface KanjiApiModel {
  freq_mainichi_shinbun: number;
  grade: number;
  heisig_en: string;
  jlpt: number;
  kanji: string;
  kun_readings: string[] | null;
  meanings: string[] | null;
  name_readings: string[] | null;
  notes: null[] | null;
  on_readings: string[] | null;
  stroke_count: number;
  unicode: string;
}

export const KanjiStatus = {
  NEW: "NEW",
  SEEN: "SEEN",
  IDLE: "IDLE",
  LEARNING: "LEARNING",
  MASTERED: "MASTERED",
} as const;

export type KanjiStatus =
  (typeof KanjiStatus)[keyof typeof KanjiStatus];

export const KanjiCategory = {
  KANJI: "KANJI",
  VOCABULARY: "VOCABULARY",
  SENTENCE: "SENTENCE",
} as const;

export type KanjiCategory =
  (typeof KanjiCategory)[keyof typeof KanjiCategory];

export interface UserNote {
  id: string;
  text: string;
  createdAt: Date;
}
export interface UserKanji {
  kanji: string;
  addedAt: Date;
  status: KanjiStatus | undefined;
  category: KanjiCategory;
  notes: UserNote[];
}

export interface Kanji {
  kanji: string;
  unicode: string;
  grade: number;
  jlpt: number;
  strokeCount: number;
  heisig: string;
  meanings: string[];
  onReadings: string[];
  kunReadings: string[];
  addedAt?: Date;
  status?: KanjiStatus;
  category?: KanjiCategory;
  notes?: UserNote[];
}

export interface UserKanjiRepository extends Repository<
  UserKanji,
  string
> {
  subscribe(
    callback: (kanjis: UserKanji[]) => void,
  ): () => void;
}
