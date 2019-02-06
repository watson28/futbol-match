import React from 'react';
import firebaseService from '../../libs/firebaseService';
import WaitFor from '../utils/WaitFor';
import { Button } from '@material-ui/core';
import Field2D from './Field2D';
import { getTeamAlingment } from '../../libs/teamFactory';
import JoinToMatchDialog from '../presentationals/JoinToMatchDialog';
import withAppState from '../utils/withAppState';

class MatchDetail extends React.Component {
  state = {
      match: null,
      matchAttenddes: [],
      attenddesLoaded: false,
      selectedPosition: null,
      confirmationDialogOpen: false
    }

  constructor(props) {
    super(props);
    this.db = firebaseService.getDatabaseRef();
  }

  componentDidMount() {
    const matchId = this.getMatchId();

    this.fetchPromise = Promise.all([
      this.fetchMatch(matchId),
      this.subscribeAttenddesChanges(matchId)
    ])
  }

  componentWillUnmount() {
    this.unsubscribeAttenddesChanges();
  }

  render() {
    return (
      <WaitFor operation={this.fetchPromise}>
        {() => (
          <React.Fragment>
            {this.isAttenddeInMatch() ? this.renderAttenddeMessage() : this.renderJoinMessage()}
            <Field2D homeTeam={this.getHomeTeam()} onPlayerClick={this.handleJoinRequest} />
            <JoinToMatchDialog
              open={this.state.confirmationDialogOpen}
              onClose={() => this.setState({ confirmationDialogOpen: false })}
              onConfirmation={this.handleJoinConfirmation} />
          </React.Fragment>
        )}
      </WaitFor>
    )
  }

  renderAttenddeMessage() {
    return (
      <React.Fragment>
        <p><strong>Ya estas inscrito en esta convocatoria.</strong></p>
        <p>Si por alguna razon no puedes asistar puedes cancelar tu asistencia una hora antes del partido.</p>
      <Button onClick={this.handleLeaveMatch} color="secondary">Salir de convocatoria</Button>
      </React.Fragment>
    )
  }

  renderJoinMessage() {
    return (
      <React.Fragment>
        <p><strong>Aun no estas inscrito en esta convocatoria.</strong></p>
        <p>Para participar selecciona cualquier posicion disponible en el campo</p>
      </React.Fragment>
    )
  }

  fetchMatch(matchId) {
    return this.db.collection('matchs').doc(matchId).get()
      .then(matchSnapshot => this.setState({ match: matchSnapshot.data() }))
  }

  subscribeAttenddesChanges(matchId) {
    return new Promise(resolve => {
      this.unsubscribeAttenddesChanges = this.db.collection('matchAttenddes')
      .where('matchId', '==', matchId)
      .onSnapshot(snapshot => {
        if (!this.state.attenddesLoaded) {
          this.setAttenddes(snapshot);
          resolve();
        } else {
          this.handleAttenddeChanges(snapshot);
        }
      })
    })
  }

  setAttenddes(snapshot) {
    this.setState({
      matchAttenddes: snapshot.docs.map(docSnapshot => docSnapshot.data()),
      attenddesLoaded: true
    });
  }

  handleAttenddeChanges(snapshot) {
    this.setAttenddes(snapshot);
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        // If added is current user show you have joined message
        // If added is other user show message user x has joined
      }
      if (change.type === "modified") {}
      if (change.type === "removed") {}
    })
  }

  getMatchId() {
    return this.props.match.params.matchId
  }

  getHomeTeam() {
    const { matchAttenddes } = this.state;

    const teamAlignment = getTeamAlingment(this.state.match.teamSize);
    matchAttenddes.forEach(attendde => {
      const [x, y] = attendde.position;
      teamAlignment[x][y] = attendde.attenddeId;
    });

    const players = matchAttenddes.map(attendde => ({
      id: attendde.attenddeId,
      name: attendde.attenddeName,
      playerNumber: attendde.playerNumber
    }));

    return { playerPositionById: teamAlignment, players }
  }

  handleJoinRequest = (player, x, y) => {
    // TODO: cancel if its already joined
    // TODO: redirect if its not logged in
    this.setState({ selectedPosition: [x, y], confirmationDialogOpen: true })
  }

  handleJoinConfirmation = (playerNumber) => {
    const { user } = this.props.appState;

    this.db.collection('matchAttenddes').add({
      attenddeId: user.uid,
      attenddeName: user.displayName,
      matchId: this.getMatchId(),
      position: this.state.selectedPosition,
      playerNumber
    }).then(() => {
      this.setState({ confirmationDialogOpen: false })
    })
  }

  handleLeaveMatch = () => {
    this.db.collection('matchAttenddes')
    .where('attenddeId', '==', this.props.appState.user.uid)
    .where('matchId', '==', this.getMatchId())
    .limit(1)
    .get()
    .then(querySnapshot => querySnapshot.docs[0].ref.delete())
  }

  isAttenddeInMatch() {
    return this.state.matchAttenddes.some(
      matchAttendde => matchAttendde.attenddeId === this.props.appState.user.uid
    );
  }
}

export default withAppState(MatchDetail);
