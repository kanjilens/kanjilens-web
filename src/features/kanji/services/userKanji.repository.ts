import type {
  UserKanji,
  UserKanjiRepository,
} from "@features/kanji/types";
import { UserKanjiMapper } from "@features/kanji/utils/kanji.mapper";
import { FirebaseRepository } from "@shared/lib/firebase/firebase.repository";
import { Firestore, updateDoc } from "firebase/firestore";

export class FirebaseUserKanjiRepository
  extends FirebaseRepository
  implements UserKanjiRepository
{
  constructor(uid: string, db: Firestore) {
    super(uid, "kanjis", db);
  }

  subscribe(
    callback: (kanjis: UserKanji[]) => void,
  ): () => void {
    return this.subscribeCollection((snapshot) => {
      callback(
        snapshot.docs.map((doc) =>
          UserKanjiMapper.fromFirestore({
            kanji: doc.id,
            ...doc.data(),
          }),
        ),
      );
    });
  }

  async getAll(): Promise<UserKanji[]> {
    const snapshot = await this.getDocuments();

    return snapshot.docs.map((doc) =>
      UserKanjiMapper.fromFirestore({
        kanji: doc.id,
        ...doc.data(),
      }),
    );
  }

  async getById(kanji: string): Promise<UserKanji | null> {
    const snapshot = await this.getDocument(kanji);

    if (!snapshot.exists()) {
      return null;
    }

    return UserKanjiMapper.fromFirestore({
      kanji: snapshot.id,
      ...snapshot.data(),
    });
  }

  async save(entity: UserKanji): Promise<void> {
    await this.saveDocument(
      entity.kanji,
      UserKanjiMapper.toFirestore(entity),
    );
  }

  async update(entity: UserKanji): Promise<void> {
    await updateDoc(
      this.document(entity.kanji),
      UserKanjiMapper.toFirestore(entity),
    );
  }

  async delete(kanji: string): Promise<void> {
    await this.deleteDocument(kanji);
  }
}
