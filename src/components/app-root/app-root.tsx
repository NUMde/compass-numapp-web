import { Component, Fragment, h, Listen, Prop, State } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil/router';
import AuthenticatedRoute from 'components/authenticated-route/authenticated-route';
import { LANGUAGES, NAVIGATION_ITEMS, FOOTER_LINKS, ROUTES } from 'config';
import services from 'services';
import store from 'store';
import { IS_TOUCH } from 'utils/device';

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
    return FOOTER_LINKS.filter(({ isAuthenticated }) => !isAuthenticated || this.isAuthenticated).map(
      ({ key, url, route }) => ({
        text: store.i18n.t(`navigation.${key}`),
        url: url ?? route,
        isStencilRoute: !!route,
        internal: !!route,
      })
    );
  }

  get navigationItems() {
    return NAVIGATION_ITEMS.map(({ key, icon, url, route, fn, isAuthenticated }) => ({
      text: store.i18n.t(`navigation.${key}`),
      route: url ?? route,
      target: url ? '_blank' : '_self',
      icon,
      iconClasses: 'icon--small',
      internal: !!route,
      condition: !isAuthenticated || this.isAuthenticated,
      ...(fn ? { fn: () => fn(store, services) } : {}),
    }));
  }

  get defaultRoute() {
    return this.isAuthenticated ? ROUTES.DASHBOARD : ROUTES.ROOT;
  }

  async componentWillLoad() {
    document.querySelector('html').classList.add(IS_TOUCH ? 'device--touch' : 'device--pointer');

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
    const { footerLinks, navigationItems } = this;

    return (
      <Fragment>
        <num-notifications />

        <d4l-app-header
          customLogo="/assets/logo.svg"
          logoUrl={ROUTES.ROOT}
          logoUrlTitle={store.i18n.t('navigation.logo')}
          logoUrlText={store.i18n.t('navigation.logo')}
          menuFooterLinks={footerLinks}
          supportedLanguages={LANGUAGES}
          selectedLanguage={store.i18n.language}
          menuNavigationItems={navigationItems}
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
            {store.i18n.t('navigation.copyright_note', { year: new Date().getFullYear() })}
          </span>
        </d4l-app-footer>
      </Fragment>
    );
  }
}

injectHistory(AppRoot);
