import React from 'react';
import CreateMatchForm from '../presentationals/createMatchForm'
import firebaseService from '../../libs/firebaseService';
import withAppstate from '../utils/withAppState';
import pick from 'lodash/pick';

class CreateMatch extends React.Component {
  render() {
    return (
      <CreateMatchForm onSubmit={this.handleSubmitForm} />
    );
  }

  handleSubmitForm = ({ teamSize, singleTeam, publicMatch, date }) => {
    const db = firebaseService.getDatabaseRef();
    const user = this.props.appState.user;
    db.collection('matches').add({
      teamSize,
      singleTeam,
      publicMatch,
      date,
      createdById: user.uid,
      createdBy: pick(user, ['uid', 'displayName', 'email'])
    })
    .then(docRef => this.props.history.push(`/match/${docRef.id}`))
  }
}

export default withAppstate(CreateMatch);
