import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto'
  },
});

const MainContent = ({ children, classes }) => (
  <main className={classes.layout}>
    <div className={classes.heroContent}>
      {children}
    </div>
  </main>
);

export default withStyles(styles)(MainContent);
