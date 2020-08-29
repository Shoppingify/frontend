import React from 'react';

// Libs
import { Route, Redirect } from "react-router-dom";

// Utils
import { checkAuth } from "../../auth/checkAuth";

// @ts-ignore
function PrivateRoute({ component: Component, ...rest}) {
  return (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    )} />
  );
}

export default PrivateRoute;