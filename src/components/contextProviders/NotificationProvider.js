import React from 'react';
import { NotificationContext } from '../../contexts/NotificationContext';
import { Snackbar, IconButton, withStyles } from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  }
});

class NotificationProvider extends React.Component {
  state = { open: false, notification: {} };
  queue = [];

  render() {
    const addNotification = this.addNotification;
    const { classes } = this.props;
    const { notification, open } = this.state
    return (
      <React.Fragment>
        <Snackbar
          key={notification.key}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          onExited={this.handleExited}
        >
          <SnackbarContent
            className={classes[notification.type]}
            aria-describedby="message-id"
            message={<span id="message-id" className={classes.message}>{notification.message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
        <NotificationContext.Provider value={{ addNotification }}>
          {this.props.children}
        </NotificationContext.Provider>
      </React.Fragment>
    )
  }

  addNotification = (message, type) => {
    debugger;
    this.queue.push({
      message,
      type,
      key: new Date().getTime()
    });
    if (this.state.open) this.setState({ open: false });
    else this.processQueue();
  }

  processQueue() {
    if (this.queue.length > 0) {
      this.setState({
        notification: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };
}

export default withStyles(styles)(NotificationProvider);
