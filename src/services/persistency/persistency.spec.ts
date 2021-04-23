import StoragePersistor from './';

let storage: Storage;
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

let persistor: StoragePersistor;
describe('local storage store', () => {
  beforeEach(() => {
    storage = buildMockStorage();
    persistor = new StoragePersistor(storage);
  });

  it('does not put data into storage until it is allowed to do so', () => {
    persistor.isPersistenceAllowed = false;

    persistor.set('foo', 'bar');

    expect(storage.length).toBe(0);

    persistor.isPersistenceAllowed = true;

    expect(storage.getItem('foo')).toEqual('bar');
  });

  it('updates storage when data changes', () => {
    persistor.isPersistenceAllowed = true;

    persistor.set('foo', 'bar');
    expect(persistor.get('foo')).toEqual('bar');
    expect(storage.getItem('foo')).toEqual('bar');

    persistor.set('foo', 'baz');
    expect(persistor.get('foo')).toEqual('baz');
    expect(storage.getItem('foo')).toEqual('baz');
  });

  it('removes item from storage when the value is set to null', () => {
    persistor.isPersistenceAllowed = true;

    persistor.set('foo', 'bar');
    expect(persistor.get('foo')).toEqual('bar');
    expect(storage.getItem('foo')).toEqual('bar');

    persistor.set('foo', 'null');
    expect(persistor.get('foo')).toEqual(null);
    expect(storage.getItem('foo')).toEqual(null);
  });
});
