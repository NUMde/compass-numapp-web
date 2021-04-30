import { Component, h } from '@stencil/core';
import { Notification } from 'services/notifier';
import store from 'store';

@Component({
  tag: 'num-notifications',
  styleUrl: 'notifications.css',
})
export class Notifications {
  onClose() {
    store.notifications.dismissCurrent();
  }

  onAction({ actionOptions: action }: Notification) {
    action.fn.apply(action.scope, action.args);
    store.notifications.dismissCurrent();
  }

  render() {
    const notification = store.notifications.current;
    const onAction = notification?.actionOptions ? () => this.onAction(notification) : undefined;

    const actionKey = notification?.actionKey || 'notification_bar.retry_button';

    return (
      <div class={`notification-container ease-in-top ${notification ? 'ease-in-top--active' : ''}`}>
        {notification ? (
          <num-notification
            action={onAction}
            actionKey={actionKey}
            close={this.onClose}
            messageKey={notification.messageKey}
            messageOptions={notification.messageOptions}
            severity={notification.severity}
          />
        ) : null}
      </div>
    );
  }
}
