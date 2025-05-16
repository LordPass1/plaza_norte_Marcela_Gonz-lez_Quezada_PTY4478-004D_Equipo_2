import { Injectable } from '@angular/core';
import { collection, addDoc, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { FirebaseInitService } from './firebase-init.service';  // Importa el servicio
import { createUserWithEmailAndPassword, Auth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db;
  private auth: Auth;

  constructor(private firebaseInitService: FirebaseInitService) {
    this.db = firebaseInitService.db;
    this.auth = firebaseInitService.auth;
  }

  // Método para registrar usuario
  async registro(nombreCompleto: string, correo: string, contraseña: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, correo, contraseña);
      const uid = userCredential.user.uid;

      const personaRef = doc(this.db, 'Personas', uid);
      await setDoc(personaRef, {
        nombreCompleto,
        correo
      });

      return uid;
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            throw new Error('El correo electrónico ya está en uso.');
          case 'auth/weak-password':
            throw new Error('La contraseña debe tener al menos 6 caracteres.');
          case 'auth/invalid-email':
            throw new Error('El correo electrónico no tiene un formato válido.');
          case 'auth/operation-not-allowed':
            throw new Error('El registro con correo y contraseña no está habilitado en Firebase.');
          default:
            throw new Error('Ocurrió un error desconocido: ' + error.code);
        }
      } else {
        console.error('Error no reconocido:', error);
        throw new Error('Error inesperado. Revisa la consola para más detalles.');
      }
    }
  }
  
  // Agrega un hogar dentro de una persona
  async addHogar(idPersona: string, nombreHogar: string) {
    const hogaresRef = collection(this.db, `Personas/${idPersona}/Hogares`);
    const newHogar = { nombreHogar };
    const hogarDoc = await addDoc(hogaresRef, newHogar);
    return hogarDoc.id;
  }

  // Agrega un grupo dentro de un hogar
  async addGrupo(idPersona: string, idHogar: string, nombreGrupo: string) {
    const gruposRef = collection(this.db, `Personas/${idPersona}/Hogares/${idHogar}/Grupos`);
    const newGrupo = { nombreGrupo };
    const grupoDoc = await addDoc(gruposRef, newGrupo);
    return grupoDoc.id;
  }

  // Agrega una maceta dentro de un grupo
  async addMaceta(idPersona: string, idHogar: string, idGrupo: string, nombrePlanta: string) {
    const macetasRef = collection(this.db, `Personas/${idPersona}/Hogares/${idHogar}/Grupos/${idGrupo}/Macetas`);
    const newMaceta = { nombrePlanta };
    await addDoc(macetasRef, newMaceta);
  }

// tener datos de la persona
  async obtenerDatosPersona() {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const docRef = doc(this.db, `Personas/${user.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Datos de la persona no encontrados');
    }
  }
  async obtenerHogarUsuario() {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const hogaresRef = collection(this.db, `Personas/${user.uid}/Hogares`);
    const querySnapshot = await getDocs(hogaresRef);

    if (!querySnapshot.empty) {
      const hogarDoc = querySnapshot.docs[0]; // Asumimos solo uno
      return hogarDoc.data(); // Devuelve los datos del hogar
    } else {
      throw new Error('No se encontró ningún hogar registrado');
    }
  }
}
