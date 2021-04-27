import { Component, h } from '@stencil/core';
import store from 'store';
import { ROUTES } from 'global/constants';
import { Card } from 'components/card/card';

@Component({
  tag: 'num-container-welcome',
})
export class Welcome {
  render() {
    return (
      <Card headline={store.i18n.t('welcome.headline')}>
        <p class="u-margin-top--normal u-text-align--center">{store.i18n.t('welcome.infotext')}</p>

        <ul class="u-list-reset">
          <li class="u-margin-top--normal">
            <stencil-route-link url={ROUTES.TERMS}>
              <d4l-button
                classes="button--tertiary button--block"
                text={store.i18n.t('welcome.terms_of_use')}
                is-route-link
              />
            </stencil-route-link>
          </li>
          <li class="u-margin-top--small u-margin-bottom--medium">
            <stencil-route-link url={ROUTES.PRIVACY_POLICY}>
              <d4l-button
                classes="button--tertiary button--block"
                text={store.i18n.t('welcome.privacy_policy')}
                is-route-link
              />
            </stencil-route-link>
          </li>
        </ul>

        <stencil-route-link url={ROUTES.AUTHENTICATE}>
          <d4l-button classes="button--block" text={store.i18n.t('welcome.continue')} />
        </stencil-route-link>
      </Card>
    );
  }
}
