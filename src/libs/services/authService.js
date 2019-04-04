import firebase from "firebase/app";

export const onAuthChangeSnapshot = (onSnapshot, onError) => {
  firebase.auth().onAuthStateChanged(onSnapshot, onError);
}