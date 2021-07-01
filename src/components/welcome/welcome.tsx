import { Component, h } from '@stencil/core';
import stores from 'stores';
import { ROUTES } from 'config';
import { Card } from 'components/card/card';

@Component({
  tag: 'num-container-welcome',
})
export class Welcome {
  render() {
    return (
      <Card headline={stores.i18n.t('welcome.headline')}>
        <p class="u-infotext">{stores.i18n.t('welcome.infotext')}</p>

        <ul class="u-list-reset">
          <li class="u-margin-top--normal">
            <stencil-route-link url={ROUTES.TERMS}>
              <d4l-button
                classes="button--tertiary button--block"
                text={stores.i18n.t('navigation.terms_of_use')}
                isRouteLink
              />
            </stencil-route-link>
          </li>
          <li class="u-margin-top--small u-margin-bottom--medium">
            <stencil-route-link url={ROUTES.PRIVACY_POLICY}>
              <d4l-button
                classes="button--tertiary button--block"
                text={stores.i18n.t('navigation.privacy_policy')}
                isRouteLink
              />
            </stencil-route-link>
          </li>
        </ul>

        <stencil-route-link url={ROUTES.AUTHENTICATE}>
          <d4l-button classes="button--block" text={stores.i18n.t('welcome.continue')} isRouteLink />
        </stencil-route-link>
      </Card>
    );
  }
}
