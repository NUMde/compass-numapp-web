import { Component, Fragment, h, Listen, Prop, State } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil/router';
import AuthenticatedRoute from 'components/authenticated-route/authenticated-route';
import { APP_LANGUAGES, ROUTES } from 'global/constants';
import services from 'services';
import store from 'store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @State() isAuthenticated = false;
  @Prop() history: RouterHistory;
  @Listen('changeLanguage', {
    target: 'window',
  })
  async changeLanguageHandler(event: CustomEvent) {
    event.stopImmediatePropagation();
    const { detail: language } = event;
    store.i18n.language = language;
  }

  get footerLinks() {
    return [
      {
        url: ROUTES.TERMS,
        text: store.i18n.t('general.terms_of_use'),
        target: '_self',
      },
      {
        url: ROUTES.PRIVACY_POLICY,
        text: store.i18n.t('general.privacy_policy'),
        target: '_self',
      },
      {
        url: ROUTES.IMPRINT,
        text: store.i18n.t('general.imprint'),
        target: '_self',
      },
    ];
  }

  get defaultRoute() {
    return this.isAuthenticated ? ROUTES.DASHBOARD : ROUTES.ROOT;
  }

  async componentWillLoad() {
    await services.user.populateStore();

    this.isAuthenticated = store.auth.isAuthenticated;
    store.auth.onStateChange((isAuthenticated: boolean) => {
      if (this.isAuthenticated !== isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
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
          customLogo="/assets/logo.svg"
          logoUrl={ROUTES.ROOT}
          logoUrlTitle={store.i18n.t('general.header_logo')}
          logoUrlText={store.i18n.t('general.header_logo')}
          menuFooterLinks={footerLinks}
          supportedLanguages={APP_LANGUAGES}
          selectedLanguage={store.i18n.language}
        />

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0.1}>
              <stencil-route
                routeRender={() =>
                  !this.isAuthenticated ? (
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
              <AuthenticatedRoute component="num-container-report" url={ROUTES.REPORT} />
              <AuthenticatedRoute component="num-container-questionnaire" url={ROUTES.QUESTIONNAIRE} />
              <stencil-route
                url={ROUTES.IMPRINT}
                component="num-legal"
                componentProps={{ namespace: 'imprint' }}
              />
              <stencil-route
                url={ROUTES.PRIVACY_POLICY}
                component="num-legal"
                componentProps={{ namespace: 'privacy_policy' }}
              />
              <stencil-route
                url={ROUTES.TERMS}
                component="num-legal"
                componentProps={{ namespace: 'terms' }}
              />
              <stencil-route routeRender={() => <stencil-router-redirect url={this.defaultRoute} />} />
            </stencil-route-switch>
          </stencil-router>
        </main>

        <d4l-app-footer footerLinks={footerLinks}>
          <span slot="copyright-info" class="u-display-block u-margin-bottom--normal">
            {store.i18n.t('general.footer_copyright_note', { year: new Date().getFullYear() })}
          </span>
        </d4l-app-footer>
      </Fragment>
    );
  }
}

injectHistory(AppRoot);
