import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCTZ_LN06If9Fm77J1KNJhvnoXJwiCWE6o',
  authDomain: 'react-spa-5d1da.firebaseapp.com',
  databaseURL: 'https://react-spa-5d1da.firebaseio.com',
  projectId: 'react-spa-5d1da',
  storageBucket: 'react-spa-5d1da.appspot.com',
  messagingSenderId: '976973836090',
  appId: '1:976973836090:web:565b4f1a3ab0b9499baa03',
  measurementId: 'G-NG8DDXX58M',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
