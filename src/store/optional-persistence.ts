import { createStore } from '@stencil/store';
import { FEATURES_ENABLE_PERSISTENCE } from 'config';
import { Services } from 'services';
import { STORAGE } from 'utils/storage';

interface StateType {
  isEnabled: boolean;
  hasLeaveGuard: boolean;
}

const storeBuilder = ({ optionalPersistor }: Services) => {
  const store = createStore<StateType>({
    isEnabled: FEATURES_ENABLE_PERSISTENCE,
    hasLeaveGuard: false,
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
    get hasLeaveGuard() {
      return store.get('hasLeaveGuard');
    },
    leaveGuard(event) {
      event.preventDefault();
      event.returnValue = '';
    },
    addLeaveGuard() {
      if (this.isEnabled || this.hasLeaveGuard) {
        return;
      }

      window.addEventListener('beforeunload', this.leaveGuard);
      store.set('hasLeaveGuard', true);
    },
    removeLeaveGuard() {
      if (this.isEnabled || !this.hasLeaveGuard) {
        return;
      }

      window.removeEventListener('beforeunload', this.leaveGuard);
      store.set('hasLeaveGuard', false);
    },
  };
};

export default storeBuilder;
