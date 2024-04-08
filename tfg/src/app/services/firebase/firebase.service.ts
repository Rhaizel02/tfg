import { Injectable } from '@angular/core';
import { initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAgWRjSWaOOu74VYHLwGIFrMSBH59ZhTAg",
  authDomain: "rolenroll-95cd8.firebaseapp.com",
  projectId: "rolenroll-95cd8",
  storageBucket: "rolenroll-95cd8.appspot.com",
  messagingSenderId: "839937393400",
  appId: "1:839937393400:web:ca44e8c60604a543c9f10d",
  measurementId: "G-1HVKENNFBS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  
  constructor() { }
}
