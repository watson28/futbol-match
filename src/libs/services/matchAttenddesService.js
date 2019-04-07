import firebaseService from "../firebaseService";
import flowRight from 'lodash/flowRight';
import { getDataFromFirebaseSnapshot } from "../utils";

export const joinToMatch = (user, matchId, data) => {
  const db = firebaseService.getDatabaseRef();
  const matchDocRef = db.collection('matches').doc(matchId);
  const matchAttenddeRef = db.collection('matchAttenddes').doc();
  return db.runTransaction(transaction => {
    return transaction.get(matchDocRef).then(matchDoc => {
      if (!matchDoc) throw new Error();
      const attenddeIds = matchDoc.get('attenddeIds') || [];
      transaction.update(matchDocRef, { attenddeIds: [...attenddeIds, user.uid] });
      transaction.set(matchAttenddeRef, {
        ...data,
        attenddeId: user.uid,
        attenddeName: user.displayName,
        matchId
      });
    });
  });
};

export const leaveMatch = async (user, matchId) => {
  const db = firebaseService.getDatabaseRef();
  const matchDocRef = db.collection('matches').doc(matchId);
  const matchAttenddeRef = await getMatchAttenddeRef(user, matchId);
  return db.runTransaction(transaction => {
    return transaction.get(matchDocRef).then(matchDoc => {
      if (!matchDoc) throw new Error();
      const attenddeIds = matchDoc.get('attenddeIds') || [];
      transaction.update(matchDocRef, {
        attenddeIds: attenddeIds.filter(attenddeId => attenddeId !== user.uid)
      });
      transaction.delete(matchAttenddeRef);
    });
  });
};

export const getMatchAttenddeRef = (user, matchId) => {
  const db = firebaseService.getDatabaseRef();
  return db.collection('matchAttenddes')
    .where('attenddeId', '==', user.uid)
    .where('matchId', '==', matchId)
    .limit(1)
    .get()
    .then(querySnapshot => querySnapshot.docs[0].ref);
};

export const matchAttenddesSnapshot =(matchId) => (onSnapshot, onError) => {
  const db = firebaseService.getDatabaseRef();
  return db.collection('matchAttenddes')
      .where('matchId', '==', matchId)
      .onSnapshot(flowRight(onSnapshot, getDataFromFirebaseSnapshot), onError);
};