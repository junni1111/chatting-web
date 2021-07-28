import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAwhtjhzfRflLZYAWhVIbtyrLkCYdoCG9M",
  authDomain: "chatting-web-46d51.firebaseapp.com",
  databaseURL: "https://chatting-web-46d51-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatting-web-46d51",
  storageBucket: "chatting-web-46d51.appspot.com",
  messagingSenderId: "116990704381",
  appId: "1:116990704381:web:a9955edcfb86770de75c94",
  measurementId: "G-FX7R7XQZWW",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
