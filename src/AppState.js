import React from 'react';
import { AppContext } from './AppContext';
import firebase from "firebase/app";
import { withRouter } from 'react-router-dom';

class AppState extends React.Component {
  state = { user: null };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({ user })
    );
  }
  
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render () {
    return (
      <AppContext.Provider value={{
        user: this.state.user,
        isLoggedIn: Boolean(this.state.user),
        loginUser: this.loginUser,
        logoutUser: this.logoutUser
      }}>
        {this.props.children}  
      </AppContext.Provider>
    );
  }

  loginUser(user) {
    this.setState({ user });
  }

  logoutUser() {
    firebase.auth().signOut();
  }
}

export default withRouter(AppState);
