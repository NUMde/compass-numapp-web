import { FALLBACK_CERTIFICATE } from 'config';
import createPersistedStore from './utils/persisted-store';
import { Services } from 'services';
import { optionalPersistence, questionnaire, user } from 'stores';

interface StateType {
  accessToken: string;
}

const storeBuilder = ({ optionalPersistor }: Services) => {
  const store = createPersistedStore<StateType>(optionalPersistor, 'auth', {
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

      optionalPersistence.disable();
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
