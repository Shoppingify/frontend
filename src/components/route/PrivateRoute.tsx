import React from 'react';

// Libs
import { Route, Redirect } from "react-router-dom";

// State
import { useRecoilValue } from "recoil/dist";
import { userState } from "../../App";

/**
 * Private route component, check if user is valid else redirect
 *
 * @param Component
 *  Component to be rendered on the route
 * @param rest
 *  Props passed in
 */
// TODO fix typescript, remove ts-ignore
// @ts-ignore
function PrivateRoute({ component: Component, ...rest}) {
  const user = useRecoilValue(userState);
  return (
    <Route {...rest} render={props => (
      user.valid ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    )} />
  );
}

export default PrivateRoute;