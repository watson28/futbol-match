import React from 'react';
import { AppContext } from '../../contexts/AppContext';
import firebase from "firebase/app";
import { withRouter } from 'react-router-dom';
import WaitFor from '../utils/WaitFor';
import FirebaseEventListener from '../../libs/FirebaseEventListener';
import { onAuthChangeSnapshot } from '../../libs/services/authService';

class AppState extends React.Component {
  state = { user: null };

  constructor(props) {
    super(props);
    this.authEventlistener = new FirebaseEventListener(onAuthChangeSnapshot);
  }

  componentDidMount() {
    this.authEventlistener.onEvent(user => this.setState({ user }));
  }

  componentWillUnmount() {
    this.authEventlistener.unsubscribe();
  }

  render() {
    return (
      <WaitFor operation={this.authEventlistener.getInitialEventPromise()}>
        <AppContext.Provider value={{
          user: this.state.user,
          isLoggedIn: Boolean(this.state.user),
          loginUser: this.loginUser,
          logoutUser: this.logoutUser
        }}>
          {this.props.children}
        </AppContext.Provider>
      </WaitFor>
    );
  }

  loginUser = (user) => {
    this.setState({ user });
  }

  logoutUser = () => {
    firebase.auth().signOut().then(() => this.props.history.replace('/'));
  }
}

export default withRouter(AppState);
