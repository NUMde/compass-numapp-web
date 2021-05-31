import { Component, h, State, Prop, Listen } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import store from 'store';

@Component({
  tag: 'num-terms',
})
export class Terms {
  @Prop() history: RouterHistory;

  @State() language: string;
  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  get currentLanguage() {
    return this.language || 'en';
  }

  render() {
    return (
      <div class="c-card-wrapper">
        <d4l-card classes="card--desktop card--text-center">
          <div class="u-margin-horizontal--card-negative" slot="card-header"></div>
          <div class="u-text-align--left" slot="card-content">
            <p innerHTML={store.i18n.t('terms.content')} />
          </div>
        </d4l-card>
      </div>
    );
  }
}
