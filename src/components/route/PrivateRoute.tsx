import React from 'react';

// Libs
import { Route, Redirect } from "react-router-dom";

// Utils
import {useRecoilValue} from "recoil/dist";
import {userState} from "../../App";

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