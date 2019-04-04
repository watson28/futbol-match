import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../presentationals/Header';
import MainContent from '../presentationals/MainContent';
import Footer from '../presentationals/Footer';
import withAppState from '../utils/withAppState';
import { withRouter } from 'react-router-dom';
import DrawerNavMenu from '../presentationals/DrawerNavMenu';

class Layout extends React.Component {
  state = { drawerOpen: false }

  render () {
    return (
      <React.Fragment>
        <CssBaseline />
        <Header
          onMenuToggle={this.handleDrawerToggle}
          navListItems={this.getNavlistItems()} />
        <MainContent>
          {this.props.children}
          <Footer />
        </MainContent>
        <DrawerNavMenu
          drawerOpen={this.state.drawerOpen}
          onCloseDrawer={this.handleDrawerToggle}
          navListItems={this.getNavlistItems()} />
      </React.Fragment>
    )
  }

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  getNavlistItems() {
    if (this.props.appState.isLoggedIn) return this.getLoggedInNavListItems();
    return this.getAnonymousNavListItems();
  }

  getLoggedInNavListItems() {
    return [
      { label: 'Home', onClick: () => this.props.history.push('/') },
      { label: 'Nueva convocatoria', onClick: () => this.props.history.push('/new-match') },
      { label: 'Mis convocatorias', onClick: () => this.props.history.push('/my-matches') },
      { label: 'Cerrar sessión', onClick: () => this.props.appState.logoutUser() }
    ];
  }

  getAnonymousNavListItems() {
    return [
      { label: 'Home', onClick: () => this.props.history.push('/') },
      { label: 'Iniciar sessión', onClick: () => this.props.history.push('/login') }
    ];
  }
}

export default withRouter(withAppState(Layout));
