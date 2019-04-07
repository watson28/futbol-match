import React from 'react';
import withAppState from '../utils/withAppState';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, withStyles, Paper } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { matchByAttenddeSnapshot, matchesByCreatorSnapshot } from '../../libs/services/matchesService';
import { format } from 'date-fns/esm';
import esLocale from 'date-fns/locale/es';
import withFirebaseData from '../utils/withFirebaseData';
import flowRight from 'lodash/flowRight';

const matchTableStyles = theme => ({
  paper: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: '20px'
  },
  matchLink: {
    verticalAlign: 'middle'
  }
});

const MyMatches = (props) => (
  <React.Fragment>
    <Typography component="h2" variant="h4" gutterBottom>Proximas convocatorias</Typography>
    <MatchTable matches={props.myMatches} />
    <Typography component="h2" variant="h4" gutterBottom>Convocatorias creadas</Typography>
    <MatchTable matches={props.createdMatches} />
  </React.Fragment>
);

const MatchTable = withStyles(matchTableStyles)(({ classes, matches }) => (
  <Paper className={classes.paper}>
    <Table className={classes.matchTable}>
      <TableHead>
        <TableRow>
          <TableCell>Fecha</TableCell>
          <TableCell align="right">Creada por</TableCell>
          <TableCell align="right">Jugadores</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {matches.map(match => (
          <TableRow key={match.id}>
            <TableCell>
              <a href={`/match/${match.id}`}>
                <span>{getMatchDate()}</span>
                <LinkIcon className={classes.matchLink} />
              </a>
            </TableCell>
            <TableCell align="right">{match.createdBy.displayName}</TableCell>
            <TableCell align="right">{match.teamSize}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
))

const getMatchDate = () => {
  return format(new Date(), `EEEE d 'de' MMMM, yyyy`, { locale: esLocale });
}

export default flowRight([
  withAppState,
  withFirebaseData(props => ({
    myMatches: matchByAttenddeSnapshot(props.appState.user.uid),
    createdMatches: matchesByCreatorSnapshot(props.appState.user.uid)
  }))
])(MyMatches)
