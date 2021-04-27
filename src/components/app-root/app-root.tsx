import { Component, Fragment, h, Prop } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil/router';
import AuthenticatedRoute from 'components/authenticated-route/authenticated-route';
import { ROUTES } from '../../global/constants';
import store from '../../store';
import { LANGUAGES } from '../../store/i18n';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
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
    return store.auth.isAuthenticated ? ROUTES.DASHBOARD : ROUTES.ROOT;
  }

  componentDidLoad() {
    let currentState = store.auth.isAuthenticated;
    store.auth.onStateChange((isAuthenticated: boolean) => {
      if (currentState !== isAuthenticated) {
        currentState = isAuthenticated;
        this.history.push(this.defaultRoute, {});
      }
    });
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
                  !store.auth.isAuthenticated ? (
                    <num-container-welcome />
                  ) : (
                    <stencil-router-redirect url={ROUTES.DASHBOARD} />
                  )
                }
                url={ROUTES.ROOT}
                exact
              />
              <stencil-route component="num-container-authenticate" url={ROUTES.AUTHENTICATE} exact />
              <AuthenticatedRoute component="num-container-dashboard" url={ROUTES.DASHBOARD} />
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
