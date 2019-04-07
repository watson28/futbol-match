import firebaseService from "../firebaseService";
import { getDataFromFirebaseSnapshot } from "../utils";
import flowRight from 'lodash/flowRight';

export const matchByAttenddeSnapshot = (attenddeId) => (onSnapshot, onError) => {
  const db = firebaseService.getDatabaseRef();
  return db.collection('matches')
    .where('attenddeIds', 'array-contains', attenddeId)
    .onSnapshot(flowRight(onSnapshot, getDataFromFirebaseSnapshot), onError)
};

export const matchesByCreatorSnapshot = (createdById) => (onSnapshot, onError) => {
  const db = firebaseService.getDatabaseRef();
  return db.collection('matches')
    .where('createdById', '==', createdById)
    .onSnapshot(flowRight(onSnapshot, getDataFromFirebaseSnapshot), onError)
}

export const matchSnapshot = (matchId) => (onSnapshot, onError) => {
  const db = firebaseService.getDatabaseRef();
  return db.collection('matches').doc(matchId).onSnapshot(onSnapshot, onError);
};