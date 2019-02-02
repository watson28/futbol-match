import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import DefaultLayout from './components/layouts/DefaultLayout';
import NewMatch from './components/pages/NewMatchPage';
import WelcomePage from './components/pages/WelcomePage';
import NotFoundPage from './components/pages/NotFoundPage';

class App extends Component {
  render() {
    return (
      <Router>
        <DefaultLayout>
          {this.renderRoutes()}
        </DefaultLayout>
      </Router>
    )
  }

  renderRoutes() {
    return (
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/new-match" component={NewMatch} />
        <Route component={NotFoundPage} />
      </Switch>
    )
  }
}

export default App;
