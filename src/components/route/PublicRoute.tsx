import React from 'react';

// Libs
import { Route } from "react-router-dom";

// @ts-ignore
function PublicRoute({ component: Component, ...rest}) {
  return (
      <Route {...rest} render={props => <Component {...props} />} />
  );
}

export default PublicRoute;