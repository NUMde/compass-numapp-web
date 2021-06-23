import { INotifierService, NotificationObserver, NotificationSeverity } from './types';

export default class NotifierService implements INotifierService {
  private observer: NotificationObserver;

  private notifyObserver(
    severity: NotificationSeverity,
    messageKey: string,
    messageOptions?: { [key: string]: any }
  ) {
    this.observer?.onNotification({
      severity,
      messageKey,
      messageOptions,
    });
  }

  observe(observer: NotificationObserver) {
    this.observer = observer;
  }

  showError(error: Error | string, options?: { [key: string]: any }) {
    return this.notifyObserver('error', (error as Error).message ?? (error as string), options);
  }

  showWarning(key: string, options?: { [key: string]: any }) {
    this.notifyObserver('warning', key, options);
  }

  showInfo(key: string, options?: { [key: string]: any }) {
    this.notifyObserver('notification', key, options);
  }

  showSuccess(key: string, options?: { [key: string]: any }) {
    this.notifyObserver('success', key, options);
  }
}

export * from './types';
