import * as firebase from 'firebase';
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyCOfEbIWsvph-XzyEn2PEpI5nn2R23nLOM",
  authDomain: "trello-69916.firebaseapp.com",
  databaseURL: "https://trello-69916.firebaseio.com",
  projectId: "trello-69916",
  storageBucket: "trello-69916.appspot.com",
  messagingSenderId: "756074996072",
  appId: "1:756074996072:web:bd1f460b733a7f4441f6dd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export const database = firebase.firestore();