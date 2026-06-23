// services/kanji/kanji.mapper.ts
import { Timestamp } from "firebase/firestore";
import type {
  Kanji,
  KanjiApiModel,
  UserKanji,
} from "@features/kanji/types";

export class KanjiMapper {
  static fromApi(api: KanjiApiModel): Kanji {
    return {
      kanji: api.kanji,
      unicode: api.unicode,

      grade: api.grade,
      jlpt: api.jlpt,
      strokeCount: api.stroke_count,

      heisig: api.heisig_en,

      meanings: api.meanings ?? [],

      onReadings: api.on_readings ?? [],

      kunReadings: api.kun_readings ?? [],

      addedAt: undefined,

      status: undefined,

      category: undefined,

      notes: [],
    };
  }
  static mergeUser(kanji: Kanji, user: UserKanji): Kanji {
    return {
      ...kanji,

      addedAt: user.addedAt,

      status: user.status,

      category: user.category,

      notes: user.notes,
    };
  }

  static toUserKanji(kanji: Kanji): UserKanji {
    return {
      kanji: kanji.kanji,
      addedAt: kanji.addedAt!,
      status: kanji.status,
      category: kanji.category!,
      notes: kanji.notes!,
    };
  }
}

export class UserKanjiMapper {
  static toFirestore(data: UserKanji) {
    return {
      ...data,
      addedAt: Timestamp.fromDate(data.addedAt),
      notes: data.notes.map((note) => ({
        ...note,
        createdAt: Timestamp.fromDate(note.createdAt),
      })),
    };
  }

  static fromFirestore(data: any): UserKanji {
    return {
      kanji: data.kanji,
      status: data.status,
      category: data.category,
      addedAt: data.addedAt.toDate(),

      notes:
        data.notes?.map((note: any) => ({
          ...note,
          createdAt: note.createdAt.toDate(),
        })) ?? [],
    };
  }
}
