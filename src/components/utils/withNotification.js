import React from 'react';
import { NotificationContext } from '../../contexts/NotificationContext';

export default (Component) => props => (
  <NotificationContext.Consumer>
    {notifications => <Component notifications={notifications} {...props} />}
  </NotificationContext.Consumer>
)
