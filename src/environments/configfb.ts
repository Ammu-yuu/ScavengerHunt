import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

export const firebaseConfig = {
      apiKey: "AIzaSyDa1ZZhdWBpZggft6hBF_xHwp_RxESwUps",
      authDomain: "scavenger-hunt-dcec2.firebaseapp.com",
      projectId: "scavenger-hunt-dcec2",
      storageBucket: "scavenger-hunt-dcec2.appspot.com",
      messagingSenderId: "889682497357",
      appId: "1:889682497357:web:f7d39d7139bccc4270b104",
      measurementId: "G-MGWNNXKEWH"
    };
    
firebase.initializeApp(firebaseConfig)

export const firebaseAuth = firebase.auth