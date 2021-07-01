import { Component, h, Prop } from '@stencil/core';
import { Card } from 'components/card/card';
import { ROUTES } from 'config';
import stores from 'stores';

@Component({
  tag: 'num-legal',
})
export class NumLegal {
  @Prop() namespace: string;

  render() {
    return (
      <Card
        headline={stores.i18n.t(`${this.namespace}.headline`)}
        returnRoute={stores.auth.isAuthenticated ? ROUTES.DASHBOARD : ROUTES.ROOT}
      >
        <p class="u-infotext" innerHTML={stores.i18n.t(`${this.namespace}.content`)} />
      </Card>
    );
  }
}
