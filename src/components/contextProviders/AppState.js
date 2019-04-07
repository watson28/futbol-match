import React from 'react';
import { AppContext } from '../../contexts/AppContext';
import firebase from "firebase/app";
import { withRouter } from 'react-router-dom';
import { onAuthChangeSnapshot } from '../../libs/services/authService';
import flowRight from 'lodash/flowRight';
import withFirebaseData from '../utils/withFirebaseData';

class AppState extends React.Component {
  render() {
    return (
      <AppContext.Provider value={{
        user: this.props.user,
        isLoggedIn: Boolean(this.props.user),
        logoutUser: this.logoutUser
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }

  logoutUser = () => {
    firebase.auth().signOut().then(() => this.props.history.replace('/'));
  }
}

export default flowRight([
  withRouter,
  withFirebaseData({ user: onAuthChangeSnapshot })
])(AppState);
