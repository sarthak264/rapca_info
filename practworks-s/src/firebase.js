import firebase from "firebase/app";
// import firebases from "firebase";

import "firebase/auth";
// import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC8meaa0ymSrjL5Ymmi4ufdBMrxhQ78Q4Y",
  authDomain: "practworks-e70dc.firebaseapp.com",
  projectId: "practworks-e70dc",
  storageBucket: "practworks-e70dc.appspot.com",
  messagingSenderId: "777265988218",
  appId: "1:777265988218:web:76dff8c61e139bf4c071c3",
  measurementId: "G-DJ4G77EMG1",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
// export default firebases;
