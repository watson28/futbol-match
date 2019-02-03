import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from "firebase/app";
import 'firebase/auth';
import './App.css';

import AppState from './AppState'
import DefaultLayout from './components/layouts/DefaultLayout';
import NewMatch from './components/pages/NewMatchPage';
import WelcomePage from './components/pages/WelcomePage';
import NotFoundPage from './components/pages/NotFoundPage';
import LoginPage from './components/pages/LoginPage';
import PrivateRoute from './components/containers/PrivateRoute';
import AnonymousRoute from './components/containers/AnonymousRoute';

// Initialize Firebase
// TODO: read config values from env variables.
var config = {
  apiKey: "AIzaSyCpXD45Ykubzqf5xN-jNlrfgfUW60Vk0IU",
  authDomain: "futbol-match-13714.firebaseapp.com",
  databaseURL: "https://futbol-match-13714.firebaseio.com",
  projectId: "futbol-match-13714",
  storageBucket: "futbol-match-13714.appspot.com",
  messagingSenderId: "862672786516"
};
firebase.initializeApp(config);

class App extends Component {

  render() {
    return (
      <AppState>
        <Router>
          <DefaultLayout>
            {this.renderRoutes()}
          </DefaultLayout>
        </Router>
      </AppState>
    )
  }

  renderRoutes() {
    return (
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <PrivateRoute path="/new-match" component={NewMatch} />
        <AnonymousRoute path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    )
  }
}

export default App;
