import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, addDoc, CollectionReference, doc, setDoc, deleteDoc, updateDoc, query, where} from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  item$: Observable<any[]>;
  firestore : Firestore = inject(Firestore);

  db_messages = collection(this.firestore, 'contact_messages');
  db_users = collection(this.firestore, 'users');
  db_friend_requests = collection(this.firestore, 'friend_requests');

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

  modifyMessage( id: string, message: string) {
    updateDoc(doc(this.db_messages, id), { message: message });
  }


  sendFriendRequest(sender_id: string, receiver_id: string) {
    addDoc(this.db_friend_requests, {sender_id: sender_id, reciever_id: receiver_id, status: "pending"});
  }

  acceptFriendRequest( id: string, friend_id: string) {
    updateDoc(doc(this.db_friend_requests, id), {status: "accepted"});
  }

  getReceivedFriendRequests(user_id: string) {
    const q = query(this.db_friend_requests, where("reciever_id", "==", user_id), where("status", "==", "pending"));
    return collectionData(q);
  }

  getSentFriendRequests(user_id: string) {
    const q = query(this.db_friend_requests, where("sender_id", "==", user_id), where("status", "==", "pending"));
    return collectionData(q);
  }

  getUsername(user_id: string) {
    const q = query(this.db_users, where("uid", "==", user_id));
    return collectionData(q);
  }

}
