import { INotifierService, NotificationObserver, ActionOptions, NotificationSeverity } from './types';

export default class NotifierService implements INotifierService {
  private observer: NotificationObserver;

  private notifyObserver(
    severity: NotificationSeverity,
    messageKey: string,
    messageOptions?: { [key: string]: any },
    actionOptions?: ActionOptions
  ) {
    if (this.observer !== undefined) {
      this.observer.onNotification({
        severity,
        messageKey,
        messageOptions,
        actionOptions,
      });
    }
  }

  observe(observer: NotificationObserver) {
    this.observer = observer;
  }

  onError<T extends (...args: any) => any>(error: Error | string, retry?: ActionOptions<T>) {
    console.error(error);
    if (typeof error === 'string') {
      return this.notifyObserver('error', error);
    }
    return this.notifyObserver('error', error.message, retry);
  }

  onInfo(key: string, options?: { [key: string]: any }) {
    this.notifyObserver('notification', key, options);
  }

  onSuccess(key: string, options?: { [key: string]: any }) {
    this.notifyObserver('success', key, options);
  }
}

export * from './types';
