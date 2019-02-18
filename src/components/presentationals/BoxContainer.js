import React from 'react';
import { Paper, withStyles } from '@material-ui/core';

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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  }
});

const BoxContainer = ({ classes, children, small }) => (
  <main className={classes.main + ' ' + (small ? classes.mainSmall: '')}>
    <Paper className={classes.paper}>
      {children}
    </Paper>
  </main>
)

export default withStyles(styles)(BoxContainer)
