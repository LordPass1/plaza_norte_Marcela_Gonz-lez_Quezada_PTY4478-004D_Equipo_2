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
  appId: "1:210753735736:android:6b618b3c440752acd36acd"
};

//iniciar la firebase, aqui hay empezar a crear el crud D:
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);