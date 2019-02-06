import React from 'react';
import { NotificationContext } from '../../contexts/NotificationContext';
import NotificationSystem from 'react-notification-system';

export default class NotificationProvider extends React.Component {
  state = { notificationRef: React.createRef() }
  
  render() {
    return (
      <React.Fragment>
        <NotificationSystem ref={this.setNotificationRef} />
        <NotificationContext.Provider value={this.state.notificationRef}>
          {this.props.children}
        </NotificationContext.Provider>
      </React.Fragment>
    )
  }

  setNotificationRef = (notificationRef) =>  {
    this.setState({ notificationRef })
  }
}
