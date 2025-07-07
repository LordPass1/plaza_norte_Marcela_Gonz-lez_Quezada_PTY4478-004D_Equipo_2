import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { environment_prod } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FirebaseInitService {
  public app!: FirebaseApp;
  public db!: Firestore;
  public auth!: Auth;
  public storage!: FirebaseStorage;
  private initialized = false;
  private initPromise!: Promise<void>;

  constructor() {
    this.initPromise = this.init();
  }

  init(): Promise<void> {
    if (this.initialized) return this.initPromise;

    this.initPromise = new Promise((resolve) => {
      this.app = initializeApp(environment_prod.firebase);
      this.db = getFirestore(this.app);
      this.auth = getAuth(this.app);
      this.storage = getStorage(this.app);
      this.initialized = true;
      resolve();
    });

    return this.initPromise;
  }

  whenReady(): Promise<void> {
    return this.initPromise;
  }
}