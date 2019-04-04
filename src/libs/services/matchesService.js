import firebaseService from "../firebaseService";

export const matchByAttenddeSnapshot = (attenddeId) => (onSnapshot, onError) => {
  const db = firebaseService.getDatabaseRef();
  db.collection('matches')
    .where('attenddeIds', 'array-contains', attenddeId)
    .onSnapshot(onSnapshot, onError)
};

export const matchSnapshot = (matchId) => (onSnapshot, onError) => {
  const db = firebaseService.getDatabaseRef();
  db.collection('matches').doc(matchId).onSnapshot(onSnapshot, onError);
};