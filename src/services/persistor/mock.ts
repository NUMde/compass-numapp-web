import { IPersistorService, PersistableData } from './types';

export default class MockPersistorService implements IPersistorService {
  private cachedData: PersistableData = {};

  get(key: string): string | undefined {
    return this.cachedData[key];
  }

  set(key: string, value: string): void {
    this.cachedData[key] = value;
  }

  getKeys() {
    return [];
  }
}
