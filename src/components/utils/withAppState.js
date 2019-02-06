import React from 'react';
import { AppContext } from '../../contexts/AppContext';

export default (Component) => props => (
  <AppContext.Consumer>
    {appState => <Component appState={appState} {...props} />}
  </AppContext.Consumer>
)
