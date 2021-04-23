import { IPersistor, PersistableData } from './types';

export default class StoragePersistor implements IPersistor {
  private cachedData: PersistableData = {};
  private storage: Storage;
  private _isPersistenceAllowed = false;
  private IS_PERSISTENCE_ALLOWED_KEY = '__INTERNAL__.isPersistenceAllowed';

  constructor(storage: Storage) {
    this.storage = storage;

    try {
      const isPersistenceAllowed = this.get(this.IS_PERSISTENCE_ALLOWED_KEY);
      if (isPersistenceAllowed !== null) {
        this._isPersistenceAllowed = JSON.parse(isPersistenceAllowed);
      }
    } catch (_e) {
      // Do nothing, isPersistenceAllowed remains false
    }
  }

  get isPersistenceAllowed() {
    return this._isPersistenceAllowed;
  }

  set isPersistenceAllowed(newValue: boolean) {
    this._isPersistenceAllowed = newValue;

    if (this._isPersistenceAllowed) {
      this.applyPending();
    }

    this.set(this.IS_PERSISTENCE_ALLOWED_KEY, JSON.stringify(newValue));
  }

  get(key: string): string | undefined {
    if (key in this.cachedData) {
      return this.cachedData[key];
    }

    return this.getStoresValue(key);
  }

  set(key: string, value: string): void {
    if (value === 'null') {
      delete this.cachedData[key];

      if (this.isPersistenceAllowed) {
        this.removeStoresValue(key);
      }
    } else {
      this.cachedData[key] = value;

      if (this.isPersistenceAllowed) {
        this.setStoresValue(key, value);
      }
    }
  }

  private applyPending() {
    Object.keys(this.cachedData).forEach((key) => {
      this.setStoresValue(key, this.cachedData[key]);
    });
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
