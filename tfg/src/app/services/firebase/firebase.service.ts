import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  item$: Observable<any[]>;
  firestore : Firestore = inject(Firestore);
  constructor(firestore: Firestore) {
    const myCollection = collection(firestore, 'rolenroll_db');
    this.item$ = collectionData(myCollection);
  }
  
  getItems() {
    return this.item$;
  }

  createDocument(data: Object) {
    const myCollection = collection(this.firestore, 'rolenroll_db');
    addDoc(myCollection, data);
  }
}
