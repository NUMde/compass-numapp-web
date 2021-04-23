import { Component, h, Prop } from '@stencil/core';
import { NotificationSeverity } from 'services/notifications';
import store from 'store';

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
    const { i18n } = store;
    const snackBarType = snackBarTypeMap[this.severity];

    return (
      <d4l-snack-bar type={snackBarType} data-test={`${this.severity}SnackBar`} data-test-context="snackBar">
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
              data-test="actionButton"
              data-test-context="snackBar"
              classes="button--text button--uppercase"
              text={i18n.t(this.actionKey)}
              handleClick={this.action}
            />
          )}
          <d4l-button
            data-test="closeButton"
            data-test-context="snackBar"
            classes="button--text button--uppercase"
            text={i18n.t('notification_bar.dismiss_button')}
            handleClick={this.close}
          />
        </div>
      </d4l-snack-bar>
    );
  }
}
