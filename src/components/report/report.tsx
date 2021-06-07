import { Component, h, State } from '@stencil/core';
import { Card } from 'components/card/card';
import { ROUTES } from 'global/constants';
import store from 'store';

@Component({
  tag: 'num-container-report',
})
export class ReportComponent {
  @State() isBusy = false;

  submitReport() {
    this.isBusy = true;
  }

  render() {
    return (
      <Card headline={store.i18n.t('report.confirm_submit.headline')}>
        <p class="u-infotext">{store.i18n.t('report.confirm_submit.infotext')}</p>

        <d4l-button
          classes="button--block u-margin-top--large"
          text={store.i18n.t('report.submit')}
          isLoading={this.isBusy}
          handleClick={() => this.submitReport()}
        />

        <stencil-route-link url={ROUTES.DASHBOARD}>
          <d4l-button
            classes="button--block button--secondary u-margin-top--normal"
            text={store.i18n.t('report.back')}
          />
        </stencil-route-link>
      </Card>
    );
  }
}
