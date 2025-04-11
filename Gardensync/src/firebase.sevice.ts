import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
  }

  // Agrega una persona (colección raíz)
  async addPersona(nombreCompleto: string, correo: string) {
    const personasRef = collection(this.db, 'Personas');
    const newPersona = {
      nombreCompleto,
      correo
    };
    const personaDoc = await addDoc(personasRef, newPersona);
    return personaDoc.id; // Devolvemos el ID para luego usarlo
  }

  // Agrega un hogar dentro de una persona
  async addHogar(idPersona: string, nombreHogar: string) {
    const hogaresRef = collection(this.db, `Personas/${idPersona}/Hogares`);
    const newHogar = {
      nombreHogar
    };
    const hogarDoc = await addDoc(hogaresRef, newHogar);
    return hogarDoc.id;
  }

  // Agrega un grupo dentro de un hogar
  async addGrupo(idPersona: string, idHogar: string, nombreGrupo: string) {
    const gruposRef = collection(this.db, `Personas/${idPersona}/Hogares/${idHogar}/Grupos`);
    const newGrupo = {
      nombreGrupo
    };
    const grupoDoc = await addDoc(gruposRef, newGrupo);
    return grupoDoc.id;
  }

  // Agrega una maceta dentro de un grupo
  async addMaceta(idPersona: string, idHogar: string, idGrupo: string, nombrePlanta: string) {
    const macetasRef = collection(this.db, `Personas/${idPersona}/Hogares/${idHogar}/Grupos/${idGrupo}/Macetas`);
    const newMaceta = {
      nombrePlanta
    };
    await addDoc(macetasRef, newMaceta);
  }
}