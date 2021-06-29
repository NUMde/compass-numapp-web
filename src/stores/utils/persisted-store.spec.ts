import { IPersistorService } from 'services/persistor';
import MockPersistor from 'services/persistor/mock';
import createPersistedStore from './persisted-store';

interface TestStore {
  foo: string;
  bar: number;
  baz: boolean;
  foo_2?: string;
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
    persistor = new MockPersistor(null);
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

    expect(persistor.getKeys()).toEqual([]);
    store.set('foo', 'bar');
    expect(persistor.getKeys()).toEqual([`${namespace}::foo`]);

    store = createPersistedStore<TestStore>(persistor, namespace, initialData);

    expect(store.state.foo).toBe('bar');
    expect(store.state.bar).toBe(42);
    expect(store.state.baz).toBe(true);
  });

  it('supports persisting / resetting with nullish values', () => {
    const store = createPersistedStore<TestStore>(persistor, namespace, initialData);

    store.set('foo', 'bar');
    expect(persistor.getKeys()).toEqual([`${namespace}::foo`]);
    store.set('foo', undefined);
    expect(store.state.foo).toBe(undefined);
    expect(persistor.getKeys()).toEqual([]);

    store.set('foo', 'bar');
    expect(persistor.getKeys()).toEqual([`${namespace}::foo`]);
    store.set('foo', null);
    expect(store.state.foo).toBe(null);
    expect(persistor.getKeys()).toEqual([]);
  });

  it('resets to the initial data', () => {
    const store = createPersistedStore<TestStore>(persistor, namespace, initialData);

    store.set('foo', 'bar');
    expect(store.state).toEqual({ ...initialData, foo: 'bar' });

    store.reset();
    expect(store.state).toEqual(initialData);
  });

  it('includes and resets even persisted non-initial data when it belongs to the same namespace', () => {
    // previously persisted data
    persistor.set(`${namespace}::foo_3`, '"bar_3"');

    const store = createPersistedStore<TestStore>(persistor, namespace, initialData);
    store.set('foo_2', 'bar_2');
    // foo_3 is also included in the state, because it was persisted with the same namespace
    expect(store.state).toEqual({ ...initialData, foo_2: 'bar_2', foo_3: 'bar_3' });
    // both new keys are persisted
    expect(persistor.getKeys()).toEqual([`${namespace}::foo_3`, `${namespace}::foo_2`]);

    store.reset();
    // new keys are removed both from the state and the storage
    expect(store.state).toEqual(initialData);
    expect(persistor.getKeys()).toEqual([]);
  });
});
