import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyBF4CAo4weI25yzEAvMq6jNsVHCDVFMYN8",
    authDomain: "library-6b0e5.firebaseapp.com",
    databaseURL: "https://library-6b0e5.firebaseio.comp",
    projectId: "library-6b0e5",
    storageBucket: "library-6b0e5.appspot.com",
    messagingSenderId: "216309075986",
    appId: "1:216309075986:web:b321e8f24bd4e8aac848cb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()