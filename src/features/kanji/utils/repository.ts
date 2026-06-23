import { MockUserKanjiRepository } from "@features/kanji/services/mockUserKanji.repository";
import { FirebaseUserKanjiRepository } from "@features/kanji/services/userKanji.repository";
import type { UserKanjiRepository } from "@features/kanji/types";
import { db } from "@shared/lib/firebase";

export function createUserKanjiRepository(
  uid: string,
): UserKanjiRepository {
  switch (import.meta.env.VITE_DATABASE) {
    case "mock":
      return new MockUserKanjiRepository();

    case "firebase":
    default: {
      return new FirebaseUserKanjiRepository(uid, db);
    }
  }
}
