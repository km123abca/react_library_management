import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAm8iwAIaxlVZME9lXmrU3LpvZeSi29wgc",
  authDomain: "day2day-c64f4.firebaseapp.com",
  databaseURL: "https://day2day-c64f4.firebaseio.com",
  projectId: "day2day-c64f4",
  storageBucket: "day2day-c64f4.appspot.com",
  messagingSenderId: "272137798125",
  appId: "1:272137798125:web:8cca4d0e64ba8dbf96e7e4",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
export default db;
export { auth };
