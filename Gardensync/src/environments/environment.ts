import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCWZN6XVLFtP7EtkJZs34dtMTdwUz-3kZE",
  authDomain: "gardensync-4174d.firebaseapp.com",
  projectId: "gardensync-4174d",
  storageBucket: "gardensync-4174d.appspot.com",
  messagingSenderId: "210753735736",
  appId: "1:210753735736:android:6b618b3c440752acd36acd",
};


export const environment = {
  production: false,
  firebase: firebaseConfig
};
