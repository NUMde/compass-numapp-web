import { Component, Fragment, h, Prop } from '@stencil/core';
import { injectHistory, LocationSegments, RouterHistory } from '@stencil/router';
import { ROUTES } from '../../global/constants';
import store from '../../store';
import { LANGUAGES } from '../../store/i18n';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @Prop() location: LocationSegments;
  @Prop() history: RouterHistory;

  get footerLinks() {
    return [
      {
        url: ROUTES.TERMS,
        text: store.i18n.t('footer.terms'),
      },
      {
        url: ROUTES.PRIVACY_POLICY,
        text: store.i18n.t('footer.privacy_policy'),
      },
      {
        url: ROUTES.IMPRINT,
        text: store.i18n.t('footer.imprint'),
      },
    ];
  }

  get defaultRoute() {
    return store.auth.get('isAuthenticated') ? ROUTES.DASHBOARD : ROUTES.ROOT;
  }

  render() {
    const { footerLinks } = this;

    return (
      <Fragment>
        <num-notifications />

        <d4l-app-header
          logoUrl={ROUTES.ROOT}
          logoUrlTitle={store.i18n.t('header.logo')}
          logoUrlText={store.i18n.t('header.logo')}
          menuFooterLinks={footerLinks}
          supportedLanguages={LANGUAGES}
          selectedLanguage={store.i18n.language}
        />

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0.1}>
              <stencil-route
                routeRender={() =>
                  !store.auth.get('isAuthenticated') ? (
                    <num-container-welcome />
                  ) : (
                    <stencil-router-redirect url={ROUTES.DASHBOARD} />
                  )
                }
                url={ROUTES.ROOT}
                exact
              />
              <stencil-route component="num-container-authenticate" url={ROUTES.AUTHENTICATE} exact />
              <stencil-route routeRender={() => <stencil-router-redirect url={this.defaultRoute} />} />
            </stencil-route-switch>
          </stencil-router>
        </main>

        <d4l-app-footer footerLinks={footerLinks}>
          <span slot="copyright-info" class="u-display-block u-margin-bottom--normal">
            {store.i18n.t('footer.copyright_note.infotext')}
          </span>
        </d4l-app-footer>
      </Fragment>
    );
  }
}

injectHistory(AppRoot);