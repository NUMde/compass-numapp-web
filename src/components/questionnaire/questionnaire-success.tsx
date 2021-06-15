import { Component, h } from '@stencil/core';
import store from 'store';
import { Card } from 'components/card/card';
import { APP_ROUTES } from 'global/constants';

@Component({
  tag: 'num-questionnaire-success',
})
export class QuestionnaireSuccessComponent {
  render() {
    return (
      <Card headline={store.i18n.t('questionnaire.success.headline')}>
        <p class="u-infotext">{store.i18n.t('questionnaire.success.infotext')}</p>
        <stencil-route-link url={APP_ROUTES.DASHBOARD}>
          <d4l-button
            classes="button--block u-margin-top--large"
            text={store.i18n.t('questionnaire.finish')}
          />
        </stencil-route-link>
      </Card>
    );
  }
}
