export interface IPersistorService {
  get(key: string): string | undefined;
  set(key: string, value: string): void;
}

export interface PersistableData {
  [key: string]: string;
}
