import React from 'react';
import { Drawer, withStyles, ListItemText } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
})

const DrawerNavMenu = ({ classes, navListItems, drawerOpen, onCloseDrawer }) => (
  <Drawer anchor="right" open={drawerOpen} onClose={onCloseDrawer}>
    <div
      tabIndex={0}
      role="button"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}>
      <div className={classes.list}>
        <List>
          {navListItems.map(listItem => (
            <ListItem button key={listItem.label} onClick={listItem.onClick}>
              <ListItemText>{listItem.label}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  </Drawer>
);

export default withStyles(styles)(DrawerNavMenu);
