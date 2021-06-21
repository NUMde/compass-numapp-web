export type NotificationSeverity = 'success' | 'notification' | 'warning' | 'error';

export interface Notification {
  actionKey?: string;
  messageKey: string;
  messageOptions?: { [key: string]: any };
  severity: NotificationSeverity;
}

export interface NotificationObserver {
  onNotification(notification: Notification): void;
}

export interface INotifierService {
  observe(observe: NotificationObserver): void;

  // error is either an Error or a translation key, options are passed to i18n
  showError(error: Error | string, options?: { [key: string]: any }): void;
  showWarning(key: string, options?: { [key: string]: any }): void;
  showInfo(key: string, options?: { [key: string]: any }): void;
  showSuccess(key: string, options?: { [key: string]: any }): void;
}
