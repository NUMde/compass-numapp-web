import { createStore } from '@stencil/store';
import { Services } from '../services';
import { Notification } from '../services/notifications';

interface StateType {
  notifications: Notification[];
}

const storeBuilder = (services: Services) => {
  const store = createStore<StateType>({
    notifications: [],
  });

  services.notifier.observe({
    onNotification(notification: Notification) {
      if ([...store.get('notifications')].pop()?.messageKey === notification.messageKey) {
        return; // no need to show the same notification twice in a row
      }

      store.set('notifications', [...store.get('notifications'), notification]);
    },
  });

  return {
    get current() {
      return store.get('notifications')[0];
    },
    dismissCurrent() {
      store.set('notifications', store.get('notifications').slice(1));
    },
  };
};

export default storeBuilder;
