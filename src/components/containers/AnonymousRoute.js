import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

export default args => {
  const { component: Component, isLoggedIn, ...rest } = args
  return (
    <Route
      {...rest}
      render={props =>
        <AppContext.Consumer>
          {({ isLoggedIn }) => (
            !isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: getRedirectionPath() }} />
          )}
        </AppContext.Consumer>
      }
    />
  )
}

const getRedirectionPath = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('afterLogin') ||  '/';
}
