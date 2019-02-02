import React from 'react';
import Field2D from '../containers/Field2D';
import soccerFieldUrl from '../../assets/soccer-field.png';
import tshirtBlueImgUrl from '../../assets/tshirt-blue.png';

const homeTeam = {
  id: 1,
  name: 'Mi equipo',
  playerPositionById: [
    [1],
    [2, 3, 4, 5],
    [6, 7],
    [8, 9, 10],
    [11]
  ],
  players: [
    {
      id: 1,
      name: 'Player 1',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '1',
      faceImgUrl: tshirtBlueImgUrl
    },
    {
      id: 2,
      name: 'Player 2',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '2',
      faceImgUrl: tshirtBlueImgUrl
    },
    {
      id: 3,
      name: 'Player 3',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '3',
      faceImgUrl: tshirtBlueImgUrl
    },
    {
      id: 4,
      name: 'Player 4',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '4',
      faceImgUrl: tshirtBlueImgUrl
    },
    {
      id: 5,
      name: 'Player 5',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '5',
      faceImgUrl: tshirtBlueImgUrl
    },
    {
      id: 6,
      name: 'Player 6',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '6',
      faceImgUrl: tshirtBlueImgUrl
    },
    {
      id: 7,
      name: 'Player 7',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '7',
      faceImgUrl: tshirtBlueImgUrl
    },
    {
      id: 8,
      name: 'Player 8',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '8',
      faceImgUrl: tshirtBlueImgUrl
    },
    {
      id: 9,
      name: 'Player 9',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '9',
      faceImgUrl: tshirtBlueImgUrl
    },
    {
      id: 10,
      name: 'Player 10',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '10',
      faceImgUrl: tshirtBlueImgUrl
    },
    {
      id: 11,
      name: 'Player 11',
      tShirtImgUrl: tshirtBlueImgUrl,
      tShirtNr: '11',
      faceImgUrl: tshirtBlueImgUrl
    }
  ]
};
const awayTeam = {
  id: 2,
  name: 'Equipo rival',
  playerPositionById: [],
  players: []
}

export default class NewMatch extends React.Component {

  state = { singleTeam: true, teamSize: 7, openMatch: true };

  fieldConfig = { width: 600, height: 390, textureUrl: soccerFieldUrl };

  render() {
    return (
      <div style={{height: '500px', margin: '0 auto'}}>
        <Field2D
          field={this.fieldConfig}
          onPlayerClick={() => alert('jaja')}
          homeTeam={homeTeam}
          awayTeam={homeTeam}
          shouldUpdate={true} />
      </div>
    );
  }

}