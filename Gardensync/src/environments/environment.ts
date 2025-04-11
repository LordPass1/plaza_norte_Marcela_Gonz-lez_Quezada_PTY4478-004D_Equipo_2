// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


export const firebaseConfig = {
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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
