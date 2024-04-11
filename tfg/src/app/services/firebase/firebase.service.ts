import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, addDoc, CollectionReference } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  item$: Observable<any[]>;
  firestore : Firestore = inject(Firestore);
  db_messages : CollectionReference = collection(this.firestore, 'contact_messages');

  constructor(firestore: Firestore) {
    const myCollection = collection(firestore, 'rolenroll_db');
    this.item$ = collectionData(myCollection);
  }
  

  createDocument(data: Object) {
    const myCollection = collection(this.firestore, 'rolenroll_db');
    addDoc(myCollection, data);
  }

  // Añadir mensaje de contacto al documento 'mensajes'
  addContactMessage(data: { name: string; email: string; message: string }) {
    addDoc(this.db_messages, data);
  }
}
