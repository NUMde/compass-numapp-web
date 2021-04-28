import createPersistedStore from './utils/persisted-store';
import { Services } from 'services';
import { user } from 'store';

interface StateType {
  accessToken: string;
}

const storeBuilder = ({ persistor }: Services) => {
  const store = createPersistedStore<StateType>(persistor, 'auth', {
    accessToken: null,
  });

  class Actions {
    get accessToken() {
      return store.get('accessToken');
    }

    get isAuthenticated() {
      return !!this.accessToken && user.isPopulated;
    }

    login(accessToken: string) {
      accessToken && store.set('accessToken', accessToken);
    }

    logout() {
      store.reset();
      user.reset();
    }

    expireSession() {
      this.logout();
    }

    onStateChange(handler: (isAuthenticated: boolean) => void) {
      store.onChange('accessToken', () => handler(this.isAuthenticated));
    }
  }

  return new Actions();
};

export type AuthStore = ReturnType<typeof storeBuilder>;

export default storeBuilder;
