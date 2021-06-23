import { Component, h } from '@stencil/core';
import store from 'store';

@Component({
  tag: 'num-notifications',
  styleUrl: 'notifications.css',
})
export class Notifications {
  onClose() {
    store.notifications.dismissCurrent();
  }

  render() {
    const notification = store.notifications.current;

    return (
      <div class={`notification-container ease-in-top ${notification ? 'ease-in-top--active' : ''}`}>
        {notification ? (
          <num-notification
            action={undefined}
            actionKey={undefined}
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
