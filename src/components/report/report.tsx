import { Component, Fragment, h, State } from '@stencil/core';
import { Card } from 'components/card/card';
import { ROUTES } from 'config';
import services from 'services';
import stores from 'stores';

@Component({
  tag: 'num-container-report',
})
export class ReportComponent {
  @State() display: 'confirm_submit' | 'success' = 'confirm_submit';
  @State() isBusy = false;

  async submitReport() {
    this.isBusy = true;

    try {
      await services.questionnaire.submitReport();
      await services.user.refresh();
      this.display = 'success';
    } catch (error) {
      this.isBusy = false;
      console.error(error);
      services.notifier.showError('report.confirm_submit.error');
    }
  }

  render() {
    const { display } = this;

    if (stores.user.isQuestionnaireAvailable && display !== 'success') {
      return <stencil-router-redirect url={ROUTES.DASHBOARD} />;
    }

    return (
      <Card headline={stores.i18n.t(`report.${display}.headline`)}>
        <p class="u-infotext">{stores.i18n.t(`report.${display}.infotext`)}</p>

        {display === 'confirm_submit' ? (
          <Fragment>
            <d4l-button
              classes="button--block u-margin-top--large"
              text={stores.i18n.t('report.confirm_submit.continue')}
              isLoading={this.isBusy}
              handleClick={() => this.submitReport()}
            />

            <stencil-route-link url={ROUTES.DASHBOARD}>
              <d4l-button
                classes="button--block button--secondary u-margin-top--normal"
                text={stores.i18n.t('report.confirm_submit.back')}
                isRouteLink
              />
            </stencil-route-link>
          </Fragment>
        ) : (
          <stencil-route-link url={ROUTES.DASHBOARD}>
            <d4l-button
              classes="button--block u-margin-top--large"
              text={stores.i18n.t('report.success.finish')}
              isRouteLink
            />
          </stencil-route-link>
        )}
      </Card>
    );
  }
}
