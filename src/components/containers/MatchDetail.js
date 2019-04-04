import React from 'react';
import firebaseService from '../../libs/firebaseService';
import WaitFor from '../utils/WaitFor';
import { Button } from '@material-ui/core';
import Field2D from './Field2D';
import { getTeamAlingment } from '../../libs/teamFactory';
import JoinToMatchDialog from '../presentationals/JoinToMatchDialog';
import withAppState from '../utils/withAppState';
import withNotification from '../utils/withNotification';
import { joinToMatch, leaveMatch } from '../../libs/services/matchAttenddesService';

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
    return this.db.collection('matches').doc(matchId).get()
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
      const message = this.getAttenddeChangeNotificationMsg(change);
      if (message) {
        this.props.notifications.addNotification({ message, level: 'success'});
      }
    })
  }

  getAttenddeChangeNotificationMsg(change) {
    const matchAttendde = change.doc.data();
    const currentUserNotification = matchAttendde.attenddeId === this.getUser().uid;
    if (change.type === "added") {
      if (currentUserNotification) return 'Genial, te has unido a esta convocatoria';
      return `${matchAttendde.attenddeName} se ha unido a esta convocatoria`;
    }
    if (change.type === "modified") {}
    if (change.type === "removed") {
      if (currentUserNotification) return 'Has salido de esta convocatoria'
      else return `${matchAttendde.attenddeName} ha abandonado esta convocatoria`
    }
  }

  getMatchId() {
    return this.props.match.params.matchId
  }

  getUser() {
    return this.props.appState.user;
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
    if (this.isAttenddeInMatch() || this.isPositionTaken(x, y)) return;
    if (!this.props.appState.user) this.props.history.push('/login');
    this.setState({ selectedPosition: [x, y], confirmationDialogOpen: true })
  }

  handleJoinConfirmation = (playerNumber) => {
    joinToMatch(
      this.props.appState.user,
      this.getMatchId(),
      { position: this.state.selectedPosition, playerNumber }
    ).then(() => this.setState({ confirmationDialogOpen: false }));
  }

  handleLeaveMatch = () => {
    leaveMatch(this.props.appState.user, this.getMatchId());
  }

  isAttenddeInMatch() {
    const user  = this.getUser();
    if (!user) return false;
    return this.state.matchAttenddes.some(matchAttendde => matchAttendde.attenddeId === user.uid);
  }

  isPositionTaken (x, y) {
    return this.state.matchAttenddes.some(
      ({ position }) => position[0] === x && position[1] === y
    );
  }
}

export default withNotification(withAppState(MatchDetail));
