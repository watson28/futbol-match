import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebaseService from './libs/firebaseService';
import './App.css';

import AppState from './AppState'
import Layout from './components/presentationals/Layout';
import CreateMatch from './components/containers/CreateMatch';
import WelcomePage from './components/containers/WelcomePage';
import NotFoundPage from './components/containers/NotFoundPage';
import LoginPage from './components/containers/LoginPage';
import PrivateRoute from './components/containers/PrivateRoute';
import AnonymousRoute from './components/containers/AnonymousRoute';
import MatchDetail from './components/containers/MatchDetail';

firebaseService.initialize();

class App extends Component {

  render() {
    return (
      <Router>
        <AppState>
          <Layout>
            {this.renderRoutes()}
          </Layout>
        </AppState>
      </Router>
    )
  }

  renderRoutes() {
    return (
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/match/:matchId" component={MatchDetail} />
        <PrivateRoute path="/new-match" component={CreateMatch} />
        <AnonymousRoute path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    )
  }
}

export default App;
