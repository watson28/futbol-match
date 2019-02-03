import tshirtBlueImgUrl from '../assets/tshirt-blue.png';
import tshirtRedImgUrl from '../assets/tshirt-red.png';
import { range } from './utils';

export const createTeam = (teamSize, homeTeam = true) => {
  const players = range(teamSize, 1).map(num => createPlayer(num, undefined, homeTeam));
  return {
    playerPositionById: getTeamAlingment(players),
    players
  }
}

export const createPlayer = (
  playerNumber = Math.floor(Math.random() * 99),
  name = `player ${playerNumber}`,
  homePlayer = true
  ) => {
  return {
    id: playerNumber,
    name,
    tShirtImgUrl: homePlayer ? tshirtBlueImgUrl : tshirtRedImgUrl,
    tShirtNr: playerNumber,
  }
};

const getTeamAlingment = (players) => {
  const teamSize = players.length;

  if (teamSize === 0) return [];
  if (teamSize === 5) {
    return [
      [players[0].id],
      players.slice(1, 3).map(player => player.id),
      players.slice(3).map(player => player.id)
    ]
  }
  if (teamSize === 6) {
    return [
      [players[0].id],
      players.slice(1, 3).map(player => player.id),
      players.slice(3, 4).map(player => player.id),
      players.slice(4).map(player => player.id)
    ]
  }
  if (teamSize === 7) {
    return [
      [players[0].id],
      players.slice(1, 4).map(player => player.id),
      players.slice(4, 5).map(player => player.id),
      players.slice(5).map(player => player.id)
    ]
  }
  if (teamSize === 11) {
    return [
      [players[0].id],
      players.slice(1, 5).map(player => player.id),
      players.slice(7, 10).map(player => player.id),
      players.slice(10).map(player => player.id)
    ]
  }

  throw new Error('not team size supported');
}