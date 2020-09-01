import React from 'react';

// Libs
import { Route } from "react-router-dom";

/**
 * Public route component
 *
 * @param Component
 *  Component to be displayed
 * @param rest
 *  Props passed in
 */
// TODO fix ts, remove ts-ignore
// @ts-ignore
function PublicRoute({ component: Component, ...rest}) {
  return (
      <Route {...rest} render={props => <Component {...props} />} />
  );
}

export default PublicRoute;