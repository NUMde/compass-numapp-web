import { IPersistorService, PersistableData } from './types';

export default class PersistorService implements IPersistorService {
  private cachedData: PersistableData = {};
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  get(key: string): string | undefined {
    if (key in this.cachedData) {
      return this.cachedData[key];
    }

    return this.getStoresValue(key);
  }

  set(key: string, value: string): void {
    if (value === null || value === 'null') {
      delete this.cachedData[key];
      this.removeStoresValue(key);
    } else {
      this.cachedData[key] = value;
      this.setStoresValue(key, value);
    }
  }

  getKeys(): string[] {
    try {
      return Object.keys(this.storage);
    } catch (e) {}
    return [];
  }

  private getStoresValue(key: string): string | undefined {
    if (!this.storage) {
      return undefined;
    }

    const value = this.storage.getItem(key);

    if (value !== null) {
      this.cachedData[key] = value;
    }

    return value;
  }

  private setStoresValue(key: string, value: string) {
    if (this.storage) {
      this.storage.setItem(key, value);
    }
  }

  private removeStoresValue(key: string) {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }
}
