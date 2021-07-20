import { Component, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { injectHistory, LocationSegments, RouterHistory } from '@stencil/router';
import AuthenticatedRoute from 'components/authenticated-route/authenticated-route';
import {
  LANGUAGES,
  NAVIGATION_ITEMS,
  FOOTER_LINKS,
  ROUTES,
  FEATURES_AUTO_LOGOUT,
  AUTO_LOGOUT_COUNTDOWN,
} from 'config';
import services from 'services';
import stores from 'stores';
import { IS_MOBILE, IS_TOUCH } from 'utils/device';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @Prop() history: RouterHistory;
  @Prop() location: LocationSegments;

  @State() isAuthenticated = false;

  @Listen('changeLanguage', {
    target: 'window',
  })
  async changeLanguageHandler(event: CustomEvent) {
    event.stopImmediatePropagation();
    const { detail: language } = event;
    stores.i18n.language = language;
  }

  @Watch('location')
  onLocationChange(newLocation, oldLocation) {
    const oldPath = oldLocation?.pathname;
    const newPath = newLocation?.pathname;

    if (this.isAuthenticated && oldPath && newPath && oldPath !== newPath) {
      stores.notifications.dismissAll();
    }
  }

  get footerLinks() {
    return FOOTER_LINKS.filter(({ isAuthenticated }) => !isAuthenticated || this.isAuthenticated).map(
      ({ key, url, route }) => ({
        text: stores.i18n.t(`navigation.${key}`),
        url: url ?? route,
        isStencilRoute: !!route,
        internal: !!route,
      })
    );
  }

  get navigationItems() {
    return NAVIGATION_ITEMS.map(({ key, icon, url, route, fn, isAuthenticated }) => ({
      text: stores.i18n.t(`navigation.${key}`),
      route: url ?? route,
      target: url ? '_blank' : '_self',
      icon,
      iconClasses: 'icon--small',
      internal: !!route,
      condition: !isAuthenticated || this.isAuthenticated,
      ...(fn ? { fn: () => fn(stores, services) } : {}),
    }));
  }

  get defaultRoute() {
    return this.isAuthenticated ? ROUTES.DASHBOARD : ROUTES.ROOT;
  }

  resetInactivityTimers() {
    services.inactivity.resetAllInactivityTimers();
  }

  updateInactivityTimers() {
    if (!FEATURES_AUTO_LOGOUT) {
      return;
    }

    this.isAuthenticated &&
      services.inactivity.startInactivityTimer(AUTO_LOGOUT_COUNTDOWN, stores.auth.expireSession);
    !this.isAuthenticated && services.inactivity.stopInactivityTimer(stores.auth.expireSession);
  }

  async componentWillLoad() {
    const htmlClasses = document.querySelector('html').classList;
    htmlClasses.add(IS_TOUCH ? 'device--touch' : 'device--pointer');
    htmlClasses.add(IS_MOBILE ? 'device--mobile' : 'device--desktop');

    await services.user.populateStore();

    this.isAuthenticated = stores.auth.isAuthenticated;
    stores.auth.onStateChange((isAuthenticated: boolean) => {
      if (this.isAuthenticated === isAuthenticated) {
        return;
      }

      this.isAuthenticated = isAuthenticated;
      this.history.push(this.defaultRoute, {});
      this.updateInactivityTimers();
    });
  }

  render() {
    const { footerLinks, navigationItems, resetInactivityTimers } = this;

    return (
      <Host
        onMouseDown={resetInactivityTimers}
        onTouchStart={resetInactivityTimers}
        onKeyDown={resetInactivityTimers}
      >
        <num-notifications />

        <d4l-app-header
          customLogo="/assets/logo.svg"
          logoUrl={ROUTES.ROOT}
          logoUrlTitle={stores.i18n.t('navigation.logo')}
          logoUrlText={stores.i18n.t('navigation.logo')}
          menuCardTitle={stores.i18n.t('navigation.title')}
          menuFooterLinks={footerLinks}
          supportedLanguages={LANGUAGES.length > 1 ? LANGUAGES : []}
          selectedLanguage={stores.i18n.language}
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
          <span slot="copyright-info" class="u-display-block u-uppercase">
            {stores.i18n.t('navigation.copyright_note', { year: new Date().getFullYear() })}
          </span>
        </d4l-app-footer>
      </Host>
    );
  }
}

injectHistory(AppRoot);
