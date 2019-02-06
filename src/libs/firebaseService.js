import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/firestore";

let db = null;

// Initialize Firebase
var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

export const initialize = () => {
  firebase.initializeApp(config);
  db = firebase.firestore();
};

export const getDatabaseRef = () => {
  return db;
};

export default { initialize, getDatabaseRef };
