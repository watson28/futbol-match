import firebase from "firebase/app";

export const onAuthChangeSnapshot = (onSnapshot, onError) => {
  return firebase.auth().onAuthStateChanged(onSnapshot, onError);
}