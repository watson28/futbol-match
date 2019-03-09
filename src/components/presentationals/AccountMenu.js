import React from 'react';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AppContext } from '../../contexts/AppContext';
import { withRouter } from 'react-router-dom';

const AccountMenu = ({ anchorEl, onClose, onOpen, history }) => (
  <AppContext.Consumer>
    {({ user, logoutUser }) => (
      <React.Fragment>
        <IconButton
          aria-owns={Boolean(anchorEl) ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={onOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <MenuItem disabled>{user.displayName}</MenuItem>
          <MenuItem onClick={() => history.push('/profile')}>Perfil</MenuItem>
          <MenuItem onClick={logoutUser}>Logout</MenuItem>`
        </Menu>
      </React.Fragment>
    )}
  </AppContext.Consumer>
)

export default withRouter(AccountMenu)