import { Component, h } from '@stencil/core';
import { Card } from 'components/card/card';
import store from 'store';

@Component({
  tag: 'num-container-dashboard',
})
export class Dashboard {
  render() {
    return (
      <Card headline={store.i18n.t('dashboard.headline')}>
        <p class="u-margin-top--normal u-margin-bottom--normal u-text-align--center">
          {store.i18n.t('dashboard.infotext')}
        </p>

        <d4l-button
          classes="button--block button--secondary"
          text={store.i18n.t('dashboard.logout')}
          handleClick={() => store.auth.logout()}
        />
      </Card>
    );
  }
}
