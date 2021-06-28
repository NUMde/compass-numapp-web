import { createStore } from '@stencil/store';
import { FEATURES_ENABLE_PERSISTENCE } from 'config';
import { Services } from 'services';
import { STORAGE } from 'utils/storage';

interface StateType {
  isEnabled: boolean;
}

const storeBuilder = ({ optionalPersistor }: Services) => {
  const store = createStore<StateType>({
    isEnabled: FEATURES_ENABLE_PERSISTENCE,
  });

  return {
    enable() {
      optionalPersistor.changeStorage(STORAGE);
      store.set('isEnabled', true);
    },
    disable() {
      optionalPersistor.changeStorage(null);
      store.set('isEnabled', false);
    },
    get isEnabled() {
      return store.get('isEnabled');
    },
  };
};

export default storeBuilder;
