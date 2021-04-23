import { INotifier, ActionOptions, NotificationObserver } from './types';

export default class MockNotifier implements INotifier {
  private observer: NotificationObserver;

  observe(observer: NotificationObserver) {
    this.observer = observer;
  }

  onError<T extends (...args: any) => any>(error: Error, retry?: ActionOptions<T>) {
    if (this.observer) {
      this.observer.onNotification({
        severity: 'error',
        messageKey: error.message,
        actionOptions: retry,
      });
    }
  }

  onInfo(key: string, options?: { [key: string]: any }) {
    if (this.observer) {
      this.observer.onNotification({
        severity: 'notification',
        messageKey: key,
        messageOptions: options,
      });
    }
  }

  onSuccess(key: string, options?: { [key: string]: any }) {
    if (this.observer) {
      this.observer.onNotification({ severity: 'success', messageKey: key, messageOptions: options });
    }
  }
}
