import React from 'react';
import CreateMatchForm from '../presentationals/createMatchForm'
import firebaseService from '../../libs/firebaseService';
import withAppstate from '../utils/withAppState';

class CreateMatch extends React.Component {
  render() {
    return (
      <CreateMatchForm onSubmit={this.handleSubmitForm} />
    );
  }

  handleSubmitForm = ({ teamSize, singleTeam, publicMatch, date }) => {
    const db = firebaseService.getDatabaseRef();
    db.collection('matches').add({
      teamSize,
      singleTeam,
      publicMatch,
      date,
      createdById: this.props.appState.user.uid
    })
    .then(docRef => this.props.history.push(`/match/${docRef.id}`))
  }
}

export default withAppstate(CreateMatch);
