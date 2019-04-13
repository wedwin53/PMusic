import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyBKRxNK2wPcILo-L0WtzW8xkwXA48O7FHo",
    authDomain: "platzimusic-f9063.firebaseapp.com",
    databaseURL: "https://platzimusic-f9063.firebaseio.com",
    projectId: "platzimusic-f9063",
    storageBucket: "platzimusic-f9063.appspot.com",
    messagingSenderId: "1020056133499"
  };

  firebase.initializeApp(config);

export const firebaseAuth = firebase.auth()
export const firebaseDatabase = firebase.database()

export default firebase
