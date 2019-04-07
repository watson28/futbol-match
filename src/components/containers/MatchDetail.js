import React from 'react';
import { Button } from '@material-ui/core';
import Field2D from './Field2D';
import { getTeamAlingment } from '../../libs/teamFactory';
import JoinToMatchDialog from '../presentationals/JoinToMatchDialog';
import withAppState from '../utils/withAppState';
import withNotification from '../utils/withNotification';
import { joinToMatch, leaveMatch, matchAttenddesSnapshot } from '../../libs/services/matchAttenddesService';
import { matchSnapshot } from '../../libs/services/matchesService';
import flowRight from 'lodash/flowRight';
import differenceBy from 'lodash/differenceBy';
import withFirebaseData from '../utils/withFirebaseData';

class MatchDetail extends React.Component {
  state = {
    selectedPosition: null,
    confirmationDialogOpen: false
  };

  componentDidUpdate(prevProps) {
    const newAttenddes = differenceBy(this.props.matchAttenddes, prevProps.matchAttenddes, 'attenddeId');
    const removedAttenddes = differenceBy(prevProps.matchAttenddes, this.props.matchAttenddes, 'attenddeId');
    
    if(newAttenddes.length > 0) {
      newAttenddes
      .map(this.getNewAttenddeMsg)
      .forEach(message => this.props.notifications.addNotification(message, 'success'));
    }
    if(removedAttenddes.length > 0) {
      removedAttenddes
      .map(this.getRemovedAttenddeMsg)
      .forEach(message => this.props.notifications.addNotification(message, 'warning'));
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.isAttenddeInMatch() ? this.renderAttenddeMessage() : this.renderJoinMessage()}
        <Field2D homeTeam={this.getHomeTeam()} onPlayerClick={this.handleJoinRequest} />
        <JoinToMatchDialog
          open={this.state.confirmationDialogOpen}
          onClose={() => this.setState({ confirmationDialogOpen: false })}
          onConfirmation={this.handleJoinConfirmation} />
      </React.Fragment>
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

  getMatchId() {
    return this.props.match.params.matchId
  }

  getUser() {
    return this.props.appState.user;
  }

  getHomeTeam() {
    const { matchAttenddes } = this.props;

    const teamAlignment = getTeamAlingment(this.props.matchDetail.teamSize);
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
    const user = this.getUser();
    if (!user) return false;
    return this.props.matchAttenddes.some(matchAttendde => matchAttendde.attenddeId === user.uid);
  }

  isPositionTaken(x, y) {
    return this.props.matchAttenddes.some(
      ({ position }) => position[0] === x && position[1] === y
    );
  }

  getNewAttenddeMsg = (matchAttendde) => {
    const currentUserNotification = matchAttendde.attenddeId === this.getUser().uid;
    return currentUserNotification
      ? 'Genial, te has unido a esta convocatoria'
      : `${matchAttendde.attenddeName} se ha unido a esta convocatoria`;
  }

  getRemovedAttenddeMsg = (matchAttendde) => {
    const currentUserNotification = matchAttendde.attenddeId === this.getUser().uid;
    return currentUserNotification
      ? 'Has salido de esta convocatoria'
      : `${matchAttendde.attenddeName} ha abandonado esta convocatoria`;
  }
}

export default flowRight([
  withNotification,
  withAppState,
  withFirebaseData(props => ({
    matchDetail: matchSnapshot(props.match.params.matchId),
    matchAttenddes: matchAttenddesSnapshot(props.match.params.matchId)
  }))
])(MatchDetail)
