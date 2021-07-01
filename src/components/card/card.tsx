import { FunctionalComponent, h } from '@stencil/core';

type CardProps = {
  headline: string;
  returnRoute?: string;
  wide?: boolean;
};

export const Card: FunctionalComponent<CardProps> = ({ headline, returnRoute, wide = false }, children) => (
  <div class={`c-card-wrapper ${wide ? 'c-card-wrapper--wide' : ''}`}>
    <d4l-card classes="card--text-center card--desktop card--no-padding">
      <div
        slot="card-header"
        class="c-card__header--segmented u-padding-horizontal--medium u-padding-vertical--normal"
      >
        <h2 class={{ 'c-card__header-title': true, 'c-card__header-title--arrowed': !!returnRoute }}>
          {headline}
        </h2>

        {returnRoute && (
          <stencil-route-link url={returnRoute} anchorClass="c-card__header-back">
            <d4l-icon-arrow-back classes="icon--small" />
          </stencil-route-link>
        )}
      </div>

      <div class="u-padding-horizontal--medium u-padding-bottom--medium" slot="card-content">
        {children}
      </div>
    </d4l-card>
  </div>
);
