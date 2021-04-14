import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyA8UnIcimVeE_r91bn2HAx7DmXrMg9JGz0",
  authDomain: "book-santa-ca406.firebaseapp.com",
  projectId: "book-santa-ca406",
  storageBucket: "book-santa-ca406.appspot.com",
  messagingSenderId: "762166557227",
  appId: "1:762166557227:web:d9624f405d76fd7a0b086e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
