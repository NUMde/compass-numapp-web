import { createStore, ObservableMap } from '@stencil/store';
import { IPersistorService } from 'services/persistor';

export default function createPersistedStore<T>(
  persistor: IPersistorService,
  namespace: string,
  initialData: T
): ObservableMap<T> {
  function namespacedKey(key: string): string {
    return `${namespace}::${key}`;
  }

  function getPersistedKeys() {
    return persistor
      .getKeys()
      .filter((key) => key.indexOf(prefix) === 0)
      .map((key) => key.replace(prefix, ''));
  }

  const prefix = namespacedKey('');
  const data = getPersistedKeys()
    .concat(Object.keys(initialData))
    .filter((key, index, arr) => arr.indexOf(key) === index)
    .reduce(
      (data, key) => {
        try {
          const value = JSON.parse(persistor.get(namespacedKey(key)));
          if (value !== null && value !== undefined) {
            return Object.assign(data, { [key]: value });
          }
        } catch (_e) {
          // ignore errors
        }
        return data;
      },
      { ...initialData }
    );

  const store = createStore<T>(data);
  const actions = {
    set(key: any, value: any) {
      try {
        persistor.set(namespacedKey(key), JSON.stringify(value));
      } catch (_e) {
        // ignore errors
      }
    },
    reset() {
      getPersistedKeys().forEach((key) => store.set(key as keyof T & string, initialData[key] ?? null));
    },
  };

  store.use(actions);

  return store;
}
