import React from 'react';
import Typography from '@material-ui/core/Typography';

export default () => (
  <React.Fragment>
    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
      Futbol Match
    </Typography>
    <Typography variant="h6" align="center" color="textSecondary" component="p">
      La applicacion que te ayuda a organizar partidos de futbols con tus amigos de forma facil y diverdida.
      Empieza creando una <a href="/new-match">nueva convocatoria</a> para tu proximo partido e invita
      tus amigos.
    </Typography>
  </React.Fragment >
);
