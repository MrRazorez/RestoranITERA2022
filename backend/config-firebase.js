const { initializeApp } = require('firebase/app');

const firebaseConfig = {
    apiKey: "AIzaSyCAu3Ev3OrtlSijlPZaLsikjpH-yjoXFhE",
    authDomain: "restoranitera2022.firebaseapp.com",
    databaseURL: "https://restoranitera2022-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "restoranitera2022",
    storageBucket: "restoranitera2022.appspot.com",
    messagingSenderId: "75846675681",
    appId: "1:75846675681:web:da315bb33f52a43e019ba0",
    measurementId: "G-64GPTL9GKC"
  };

const firebase = initializeApp(firebaseConfig);

module.exports = firebase;