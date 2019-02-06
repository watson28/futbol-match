import React from 'react';
import Typography from '@material-ui/core/Typography';

export default () => (
  <React.Fragment>
    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
      404
    </Typography>
    <Typography variant="h6" align="center" color="textSecondary" component="p">
      La pagina que estas intentando buscar no existe.
    </Typography>
  </React.Fragment >
);
