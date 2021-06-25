export interface IPersistorService {
  changeStorage(storage: Storage): void;
  get(key: string): string | undefined;
  set(key: string, value: string): void;
  getKeys(): string[];
}

export interface PersistableData {
  [key: string]: string;
}
