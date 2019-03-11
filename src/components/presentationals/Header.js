import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { AppContext } from '../../contexts/AppContext';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  menuButton: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  navListItems: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }
});

const Header = ({ classes, navListItems, onMenuToggle }) => (
  <AppBar position="static" color="default" className={classes.appBar}>
    <AppContext.Consumer>
      {({ isLoggedIn }) => (
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Futbol Match
          </Typography>
          <div className={classes.navListItems}>
            {navListItems.map(listItem => (
              <Button key={listItem.label} onClick={listItem.onClick}>{listItem.label}</Button>
            ))}
          </div>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={onMenuToggle}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      )}
    </AppContext.Consumer>
  </AppBar>
)

export default withStyles(styles)(Header);