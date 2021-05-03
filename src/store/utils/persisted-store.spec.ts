import { IPersistorService } from 'services/persistor';
import MockPersistor from 'services/persistor/mock';
import createPersistedStore from './persisted-store';

interface TestStore {
  foo: string;
  bar: number;
  baz: boolean;
}

const namespace = 'test';
let persistor: IPersistorService;
const initialData: TestStore = {
  foo: 'foo',
  bar: 42,
  baz: true,
};

describe('persisted store', () => {
  beforeEach(() => {
    persistor = new MockPersistor();
  });

  it('uses initial data if persistor does not contain data', () => {
    const store = createPersistedStore<TestStore>(persistor, namespace, initialData);

    expect(store.state.foo).toBe('foo');
    expect(store.state.bar).toBe(42);
    expect(store.state.baz).toBe(true);
  });

  it('overrides initial data with data from persistor', () => {
    let store = createPersistedStore<TestStore>(persistor, namespace, initialData);

    store.set('foo', 'bar');
    store.set('bar', 0);
    store.set('baz', false);

    store = createPersistedStore<TestStore>(persistor, namespace, initialData);

    expect(store.state.foo).toBe('bar');
    expect(store.state.bar).toBe(0);
    expect(store.state.baz).toBe(false);
  });

  it('supports partial overrides from persistor', () => {
    let store = createPersistedStore<TestStore>(persistor, namespace, initialData);

    store.set('foo', 'bar');

    store = createPersistedStore<TestStore>(persistor, namespace, initialData);

    expect(store.state.foo).toBe('bar');
    expect(store.state.bar).toBe(42);
    expect(store.state.baz).toBe(true);
  });

  it('supports persisting of undefined values', () => {
    let store = createPersistedStore<TestStore>(persistor, namespace, {
      ...initialData,
      foo: undefined,
    });

    store.set('foo', undefined);

    store = createPersistedStore<TestStore>(persistor, namespace, {
      ...initialData,
      foo: undefined,
    });

    expect(store.state.foo).toBe(undefined);
  });
});
