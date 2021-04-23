import { IPersistor, PersistableData } from '../persistency/types';

export default class MockPersistor implements IPersistor {
  private cachedData: PersistableData = {};
  isPersistenceAllowed = false;

  get(key: string): string | undefined {
    return this.cachedData[key];
  }

  set(key: string, value: string): void {
    this.cachedData[key] = value;
  }
}
