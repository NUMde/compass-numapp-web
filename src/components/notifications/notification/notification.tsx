import { Component, h, Prop } from '@stencil/core';
import { NotificationSeverity } from 'services/notifier';
import stores from 'stores';

const snackBarTypeMap: { [key: string]: string } = {
  error: 'error',
  notification: 'notification',
  success: 'success',
  warning: 'error',
};

@Component({
  tag: 'num-notification',
  styleUrl: 'notification.css',
})
export class Notification {
  @Prop() actionKey!: string;
  @Prop() messageKey!: string;
  @Prop() messageOptions?: { [key: string]: any };
  @Prop() close!: () => void;
  @Prop() action: () => void;
  @Prop() severity!: NotificationSeverity;

  render() {
    const { i18n } = stores;
    const snackBarType = snackBarTypeMap[this.severity];

    return (
      <d4l-snack-bar type={snackBarType}>
        <div slot="snack-bar-icon">
          {(this.severity === 'error' || this.severity === 'warning') && (
            <d4l-icon-error-outline classes="icon--small icon--white" />
          )}
          {this.severity === 'success' && <d4l-icon-check classes="icon--small icon--white" />}
          {this.severity === 'notification' && <d4l-icon-info classes="icon--small" />}
        </div>
        <div class="u-padding-left--xs" slot="snack-bar-content">
          {i18n.t(this.messageKey, { ...this.messageOptions })}
        </div>
        <div slot="snack-bar-controls">
          {this.action && (
            <d4l-button
              classes="button--text button--uppercase"
              text={i18n.t(this.actionKey)}
              handleClick={this.action}
            />
          )}
          <d4l-button
            classes="button--text button--uppercase"
            text={i18n.t('notification_bar.dismiss_button')}
            handleClick={this.close}
          />
        </div>
      </d4l-snack-bar>
    );
  }
}
