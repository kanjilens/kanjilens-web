export interface Repository<T, TId = string> {
  getAll(): Promise<T[]>;

  getById(id: TId): Promise<T | null>;

  save(entity: T): Promise<void>;

  update(entity: T): Promise<void>;

  delete(id: TId): Promise<void>;
}
