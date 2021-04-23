import { Component, h } from '@stencil/core';
import store from '../../store';
import { ROUTES } from '../../global/constants';

@Component({
  tag: 'num-container-welcome',
})
export class Welcome {
  render() {
    return (
      <div class="c-card-wrapper">
        <d4l-card classes="card--text-center card--desktop card--no-padding">
          <div
            slot="card-header"
            class="c-card__header--segmented u-padding-horizontal--medium u-padding-vertical--normal"
          >
            <h2>{store.i18n.t('welcome.introduction.headline')}</h2>
          </div>

          <div class="u-padding-horizontal--medium u-padding-bottom--medium" slot="card-content">
            <p class="u-margin-top--normal u-text-align--center">
              {store.i18n.t('welcome.introduction.infotext')}
            </p>

            <ul class="u-list-reset">
              <li class="u-margin-top--normal">
                <stencil-route-link url={ROUTES.TERMS}>
                  <d4l-button
                    classes="button--tertiary button--block"
                    text={store.i18n.t('welcome.terms_of_use.link')}
                    is-route-link
                  />
                </stencil-route-link>
              </li>
              <li class="u-margin-top--small u-margin-bottom--medium">
                <stencil-route-link url={ROUTES.PRIVACY_POLICY}>
                  <d4l-button
                    classes="button--tertiary button--block"
                    text={store.i18n.t('welcome.privacy_policy.link')}
                    is-route-link
                  />
                </stencil-route-link>
              </li>
            </ul>

            <stencil-route-link url={ROUTES.AUTHENTICATE}>
              <d4l-button classes="button--block" text={store.i18n.t('welcome.introduction.continue')} />
            </stencil-route-link>
          </div>
        </d4l-card>
      </div>
    );
  }
}
