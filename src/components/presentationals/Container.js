import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
  },
  mainSmall: {
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  content: {
    marginTop: theme.spacing.unit * 8
  }
});

const Container = ({ classes, children, small, className }) => (
  <main className={classes.main + ' ' + (small ? classes.mainSmall: '') + ' ' + className}>
    <div className={classes.content}>{children}</div>
  </main>
)

export default withStyles(styles)(Container)
