import { Component, h } from '@stencil/core';
import stores from 'stores';
import { Card } from 'components/card/card';
import { ROUTES } from 'config';

@Component({
  tag: 'num-questionnaire-success',
})
export class QuestionnaireSuccessComponent {
  render() {
    return (
      <Card headline={stores.i18n.t('questionnaire.success.headline')}>
        <p class="u-infotext">{stores.i18n.t('questionnaire.success.infotext')}</p>
        <stencil-route-link url={ROUTES.DASHBOARD}>
          <d4l-button
            classes="button--block u-margin-top--large"
            text={stores.i18n.t('questionnaire.finish')}
            isRouteLink
          />
        </stencil-route-link>
      </Card>
    );
  }
}
