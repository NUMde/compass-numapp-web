import PersistorService from './';

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

let persistor: PersistorService;
describe('local storage store', () => {
  beforeEach(() => {
    storage = buildMockStorage();
    persistor = new PersistorService(storage);
  });

  it('puts data into storage', () => {
    persistor.set('foo', 'bar');
    expect(storage.getItem('foo')).toEqual('bar');
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
});
