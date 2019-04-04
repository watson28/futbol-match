import React from 'react';
import FirebaseEventListener from '../../libs/FirebaseEventListener';
import WaitFor from '../utils/WaitFor';
import withAppState from '../utils/withAppState';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { matchByAttenddeSnapshot } from '../../libs/services/matchesService';

class MyMatches extends React.Component {
  state = { myMatches: [] };

  constructor(props) {
    super(props);
    const { user } = this.props.appState;
    this.myMatchesEventListener = new FirebaseEventListener(
      matchByAttenddeSnapshot(user.uid)
    );
  }

  componentDidMount() {
    this.myMatchesEventListener.onEvent(snapshot => {
      this.setState({
        myMatches: snapshot.docs.map(docSnapshot => ({ ...docSnapshot.data(), id: docSnapshot.id }))
      })
    })
  }

  render() {
    return (
      <WaitFor operation={this.myMatchesEventListener.getInitialEventPromise()}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Creada por</TableCell>
              <TableCell>Jugadores</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.myMatches.map(match => (
              <TableRow key={match.id}>
                <TableCell>{match.date.toString()}</TableCell>
                <TableCell>{match.createdById}</TableCell>
                <TableCell>{match.teamSize}</TableCell>
                <TableCell><a href={`/match/${match.id}`}>ir a convocatoria</a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WaitFor>
    );
  }
}

export default withAppState(MyMatches);
