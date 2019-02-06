import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
})

const LoadingIndicator =  ({ classes }) => (
  <div className={classes.appBar}>
    <CircularProgress />
  </div>
)

export default withStyles(styles)(LoadingIndicator);
