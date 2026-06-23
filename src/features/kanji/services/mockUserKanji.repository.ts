import type {
  UserKanji,
  UserKanjiRepository,
} from "@features/kanji/types";

export class MockUserKanjiRepository implements UserKanjiRepository {
  private kanjis = new Map<string, UserKanji>();
  private listeners = new Set<
    (kanjis: UserKanji[]) => void
  >();

  subscribe(callback: (kanjis: UserKanji[]) => void) {
    this.listeners.add(callback);

    callback([...this.kanjis.values()]);

    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    const data = [...this.kanjis.values()];

    this.listeners.forEach((listener) => listener(data));
  }

  async getAll(): Promise<UserKanji[]> {
    return [...this.kanjis.values()];
  }

  async getById(kanji: string): Promise<UserKanji | null> {
    return this.kanjis.get(kanji) ?? null;
  }

  async save(entity: UserKanji): Promise<void> {
    this.kanjis.set(entity.kanji, entity);
    this.notify();
  }

  async update(entity: UserKanji): Promise<void> {
    this.kanjis.set(entity.kanji, entity);
    this.notify();
  }

  async delete(kanji: string): Promise<void> {
    this.kanjis.delete(kanji);
    this.notify();
  }
}
