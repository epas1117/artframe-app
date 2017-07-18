// This file is created to initialize the Firebase instance and that could be accesed
// anywhere in the app like 'firebaseServices.js'

import firebase from 'firebase';

// Initialize Firebase
export default firebase.initializeApp({
  apiKey: "AIzaSyBVnTAunoMNQEpC2SHpxl71HzXEPRzB2jo",
  authDomain: "artframe-e7077.firebaseapp.com",
  databaseURL: "https://artframe-e7077.firebaseio.com",
  storageBucket: "artframe-e7077.appspot.com",
  messagingSenderId: "349771072735"
});
