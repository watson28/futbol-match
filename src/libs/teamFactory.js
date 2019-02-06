import { range } from './utils';

export const createTeam = (teamSize, homeTeam = true) => {
  const players = range(teamSize, 1).map(num => createPlayer(num, undefined));
  return {
    playerPositionById: getTeamAlingment(teamSize),
    players
  }
}

export const createPlayer = (
  playerNumber = Math.floor(Math.random() * 99),
  name = `player ${playerNumber}`
  ) => {
  return {
    id: playerNumber,
    name,
    playerNumber,
  }
};

// TODO: refactor this
export const getTeamAlingment = (teamSize) => {
  if (teamSize === 0) return [];
  if (teamSize === 5) {
    return [
      [null],
      [null, null],
      [null, null]
    ]
  }
  if (teamSize === 6) {
    return [
      [null],
      [null, null],
      [null],
      [null, null]
    ]
  }
  if (teamSize === 7) {
    return [
      [null],
      [null, null, null],
      [null],
      [null, null]
    ]
  }
  if (teamSize === 11) {
    return [
      [null],
      [null, null, null, null],
      [null, null, null],
      [null],
      [null, null]
    ]
  }

  throw new Error('not team size supported');
}