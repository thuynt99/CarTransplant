import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCL4w9r3f2ucuDNo1SUEVeLftf7M1VzcMM',
  authDomain: 'cartransplant.firebaseapp.com',
  projectId: 'cartransplant',
  storageBucket: 'cartransplant.appspot.com',
  messagingSenderId: '454714905801',
  appId: '1:454714905801:web:eacc91f84ef12aeeeee918',
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
// firebase.analytics();
