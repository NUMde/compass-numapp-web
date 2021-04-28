import { createStore, ObservableMap } from '@stencil/store';
import { IPersistor } from '../../services/persistency';

export default function createPersistedStore<T>(
  persistor: IPersistor,
  namespace: string,
  initialData: T
): ObservableMap<T> {
  function namespacedKey(key: string): string {
    return `${namespace}::${key}`;
  }

  const persistedData = {};

  Object.keys(initialData).forEach((key) => {
    let persistedValue = undefined;

    try {
      persistedValue = JSON.parse(persistor.get(namespacedKey(key)));
    } catch (_e) {
      // Skip this persisted value
    }

    if (persistedValue !== null && persistedValue !== undefined) {
      persistedData[key] = persistedValue;
    }
  });

  const store = createStore<T>({ ...initialData, ...persistedData });

  store.use({
    set(key: any, value: any) {
      try {
        persistor.set(namespacedKey(key), JSON.stringify(value));
      } catch (_e) {
        // Don't persist if it can't be stringified
      }
    },
    reset() {
      Object.keys(initialData).forEach((key) => store.set(key as keyof T & string, initialData[key]));
    },
  });

  return store;
}
