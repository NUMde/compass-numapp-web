import PersistorService from './';

let storage: Storage;
let persistor: PersistorService;

const buildMockStorage: () => Storage = () => {
  let store = {};

  return {
    clear() {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    getItem(key: any) {
      return store[key] || null;
    },
    key(index: number) {
      return Object.keys(store)[index];
    },
    removeItem(key: any) {
      delete store[key];
    },
    setItem(key: any, value: any) {
      store[key] = value.toString();
    },
  };
};

describe('PersistorService', () => {
  beforeEach(() => {
    storage = buildMockStorage();
    persistor = new PersistorService(storage);
  });

  it('puts data into storage', () => {
    persistor.set('foo', 'bar');
    storage.setItem('bar', 'foo');
    expect(storage.getItem('foo')).toEqual('bar');
    expect(persistor.get('bar')).toEqual('foo');
  });

  it('updates storage when data changes', () => {
    persistor.set('foo', 'bar');
    expect(persistor.get('foo')).toEqual('bar');
    expect(storage.getItem('foo')).toEqual('bar');

    persistor.set('foo', 'baz');
    expect(persistor.get('foo')).toEqual('baz');
    expect(storage.getItem('foo')).toEqual('baz');
  });

  it('removes item from storage when the value is set to null', () => {
    persistor.set('foo', 'bar');
    expect(persistor.get('foo')).toEqual('bar');
    expect(storage.getItem('foo')).toEqual('bar');

    persistor.set('foo', 'null');
    expect(persistor.get('foo')).toEqual(null);
    expect(storage.getItem('foo')).toEqual(null);
  });

  it('returns keys of persisted storage', () => {
    persistor.set('foo', 'one');
    persistor.set('bar', 'two');
    expect(persistor.getKeys()).toEqual(['foo', 'bar']);
  });

  it('is resistant to thrown storage errors', () => {
    const faultyStorage = {
      key() {
        throw new Error();
      },
      setItem() {
        throw new Error();
      },
      getItem() {
        throw new Error();
      },
      removeItem() {
        throw new Error();
      },
      get length() {
        return 2;
      },
    };

    const persistorWithFaultyStorage = new PersistorService(faultyStorage as unknown as Storage);
    persistorWithFaultyStorage.set('foo', 'bar');
    expect(persistorWithFaultyStorage.get('foo')).toBe('bar');
    expect(persistorWithFaultyStorage.getKeys()).toEqual(['foo']);
    persistorWithFaultyStorage.set('foo', null);
    expect(persistorWithFaultyStorage.get('foo')).toBe(undefined);
    expect(persistorWithFaultyStorage.getKeys()).toEqual([]);
  });

  it('is resistant to missing storage', () => {
    const persistorWithMissingStorage = new PersistorService(undefined);
    expect(persistorWithMissingStorage.get('foo')).toBe(undefined);
    expect(persistorWithMissingStorage.getKeys()).toEqual([]);
    persistorWithMissingStorage.set('foo', 'bar');
    expect(persistorWithMissingStorage.get('foo')).toBe('bar');
    expect(persistorWithMissingStorage.getKeys()).toEqual(['foo']);
    persistorWithMissingStorage.set('foo', null);
    expect(persistorWithMissingStorage.get('foo')).toBe(undefined);
    expect(persistorWithMissingStorage.getKeys()).toEqual([]);
  });

  it('can change the storage', () => {
    persistor.set('foo', 'foo');
    expect(storage.getItem('foo')).toEqual('foo');

    persistor.changeStorage(null);
    persistor.set('bar', 'bar');
    expect(storage.getItem('bar')).toEqual(null);
  });
});
