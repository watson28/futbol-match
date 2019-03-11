import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebaseService from './libs/firebaseService';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import customTheme from './customTheme';

import AppState from './components/contextProviders/AppState'
import NotificationProvider from './components/contextProviders/NotificationProvider';
import Layout from './components/containers/Layout';
import CreateMatch from './components/containers/CreateMatch';
import WelcomePage from './components/containers/WelcomePage';
import NotFoundPage from './components/containers/NotFoundPage';
import LoginPage from './components/containers/LoginPage';
import PrivateRoute from './components/containers/PrivateRoute';
import AnonymousRoute from './components/containers/AnonymousRoute';
import MatchDetail from './components/containers/MatchDetail';
import { MuiThemeProvider } from '@material-ui/core';
import MyMatches from './components/containers/MyMatches';

firebaseService.initialize();

class App extends Component {

  render() {
    return (
      <Router>
        <NotificationProvider>
          <AppState>
            <MuiThemeProvider theme={customTheme}>
            <Layout>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}> 
                {this.renderRoutes()}
              </MuiPickersUtilsProvider>
            </Layout>
            </MuiThemeProvider>
          </AppState>
        </NotificationProvider>
      </Router>
    )
  }

  renderRoutes() {
    return (
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/match/:matchId" component={MatchDetail} />
        <PrivateRoute path="/new-match" component={CreateMatch} />
        <PrivateRoute path="/my-matches" component={MyMatches} />
        <AnonymousRoute path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    )
  }
}

export default App;
