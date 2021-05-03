export type NotificationSeverity = 'success' | 'notification' | 'warning' | 'error';

export interface ActionOptions<T extends (...args: any) => any = (...args: any) => any> {
  scope: any;
  fn: T;
  args?: Parameters<T>;
}

export interface Notification {
  actionKey?: string;
  actionOptions?: ActionOptions;
  messageKey: string;
  messageOptions?: { [key: string]: any };
  severity: NotificationSeverity;
}

export interface NotificationObserver {
  onNotification(notification: Notification): void;
}

export interface INotifierService {
  /**
   * Observe for notification
   * @param observe The NotificationObserver
   */
  observe(observe: NotificationObserver): void;

  /**
   * Notify the user of an error
   * @param error Either an Error or a lokalise key
   * @param action A potential action that could be retried
   */
  onError<T extends (...args: any) => any>(error: Error | string, action?: ActionOptions<T>): void;

  /**
   * Inform the user about something
   * @param key A lokalise key
   * @param options The options for the lokalise key
   */
  onInfo(key: string, options?: { [key: string]: any }): void;

  /**
   * Display a success message to the user
   * @param key A lokalise key
   * @param options The options for the lokalise key
   */
  onSuccess(key: string, options?: { [key: string]: any }): void;
}
