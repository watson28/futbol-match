import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export default () => (
  <React.Fragment>
    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
      Futbol Match
    </Typography>
    <Typography variant="h6" align="center" color="textSecondary" component="p">
      La applicacion que te ayuda a organizar partidos de futbols con tus amigos de forma facil y diverdida.
      Empieza creando una <Link to="/new-match">nueva convocatoria</Link> para tu proximo partido e invita
      tus amigos.
    </Typography>
  </React.Fragment >
);
