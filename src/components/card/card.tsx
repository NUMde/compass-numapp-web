import { FunctionalComponent, h } from '@stencil/core';

type CardProps = {
  headline: string;
  wide?: boolean;
};

export const Card: FunctionalComponent<CardProps> = ({ headline, wide = false }, children) => (
  <div class={`c-card-wrapper ${wide ? 'c-card-wrapper--wide' : ''}`}>
    <d4l-card classes="card--text-center card--desktop card--no-padding">
      <div
        slot="card-header"
        class="c-card__header--segmented u-padding-horizontal--medium u-padding-vertical--normal"
      >
        <h2>{headline}</h2>
      </div>

      <div class="u-padding-horizontal--medium u-padding-bottom--medium" slot="card-content">
        {children}
      </div>
    </d4l-card>
  </div>
);
