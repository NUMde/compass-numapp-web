import { createStore } from '@stencil/store';
import { Services } from '../services';

interface StateType {
  accessToken?: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

const storeBuilder = (_services: Services) => {
  const store = createStore<StateType>({
    isAuthenticated: false,
    isAuthenticating: false,
  });

  class Actions {
    async login() {
      store.set('isAuthenticated', true);
    }

    async refreshSession() {
      store.set('isAuthenticated', true);
      return true;
    }

    async logout() {
      store.set('isAuthenticated', false);
    }

    async expireSession() {
      await this.logout();
    }
  }

  const actions = new Actions();

  return {
    get: store.get,
    login: actions.login.bind(actions),
    logout: actions.logout.bind(actions),
    refreshSession: actions.refreshSession.bind(actions),
    expireSession: actions.expireSession.bind(actions),
  };
};

export type AuthStore = ReturnType<typeof storeBuilder>;

export default storeBuilder;
