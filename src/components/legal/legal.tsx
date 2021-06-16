import { Component, h, Prop } from '@stencil/core';
import { Card } from 'components/card/card';
import store from 'store';

@Component({
  tag: 'num-legal',
})
export class NumLegal {
  @Prop() namespace: string;

  render() {
    return (
      <Card headline={store.i18n.t(`${this.namespace}.headline`)}>
        <p class="u-infotext" innerHTML={store.i18n.t(`${this.namespace}.content`)} />
      </Card>
    );
  }
}
