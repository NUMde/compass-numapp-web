import { createStore } from '@stencil/store';
import { Services } from 'services';
import { Notification } from 'services/notifier';

interface StateType {
  notifications: Notification[];
}

const storeBuilder = ({ notifier }: Services) => {
  const store = createStore<StateType>({
    notifications: [],
  });

  notifier.observe({
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