import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    margin: '10px'
  }
})

const LoadingIndicator =  ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress />
  </div>
)

export default withStyles(styles)(LoadingIndicator);
