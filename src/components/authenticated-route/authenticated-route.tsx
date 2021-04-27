import { h } from '@stencil/core';
import { ROUTES } from 'global/constants';
import store from 'store';

type AuthenticatedRouteProps = {
  component: string;
  exact?: boolean;
  props?: any;
  componentProps?: any;
  url: string;
};

export const AuthenticatedRoute = ({ component, ...props }: AuthenticatedRouteProps) => {
  const Component = component;

  return (
    <stencil-route
      {...props}
      routeRender={(props: { [key: string]: any }) => {
        if (store.auth.isAuthenticated) {
          return <Component {...props} {...props.componentProps} />;
        }

        return <stencil-router-redirect url={ROUTES.ROOT} />;
      }}
    />
  );
};

export default AuthenticatedRoute;
