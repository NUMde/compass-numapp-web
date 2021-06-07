import { FALLBACK_CERTIFICATE } from 'global/constants';
import createPersistedStore from './utils/persisted-store';
import { Services } from 'services';
import { user, questionnaire } from 'store';

interface StateType {
  accessToken: string;
}

const storeBuilder = ({ persistor }: Services) => {
  const store = createPersistedStore<StateType>(persistor, 'auth', {
    accessToken: null,
  });

  class Actions {
    #certificate?: string;

    get accessToken() {
      return store.get('accessToken');
    }

    get isAuthenticated() {
      return !!this.accessToken && user.isPopulated;
    }

    get certificate() {
      return this.#certificate ?? FALLBACK_CERTIFICATE;
    }
    set certificate(certificate: string) {
      if (certificate && certificate !== 'false') {
        this.#certificate = certificate;
      }
    }

    login(accessToken: string) {
      accessToken && store.set('accessToken', accessToken);
    }

    logout() {
      store.reset();
      user.reset();
      questionnaire.reset();
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
