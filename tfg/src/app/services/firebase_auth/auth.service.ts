import { Injectable,NgZone } from '@angular/core';
import { Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User,
updateProfile} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { collection, addDoc, Firestore } from '@angular/fire/firestore';
import { updateCurrentUser } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  UserData : any;
  constructor(private auth: Auth,private router : Router, public ngZone: NgZone, private firestore: Firestore){
    onAuthStateChanged(this.auth,(user: any)=>{
      if(user){
        updateCurrentUser(this.auth, user);
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
   }

    //get User
    //get Authenticated user from firebase
    getAuthFire(){
      return this.auth.currentUser;
    }


    //get Authenticated user from Local Storage
    getAuthLocal(){
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user;
    }


    //Check wither User Is looged in or not
    get isLoggedIn(): boolean {
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user !== null ? true : false;
    }

    //Register Method
    // Register Method
    Register(username: string, email: string, password: string) {
      return createUserWithEmailAndPassword(this.auth, email, password)
        .then((result) => {
          updateProfile(result.user, { displayName: username });
          this.UserData = result.user;
          this.UserData.displayName = username;
          this.registerUserInFirestore(username, email, this.UserData.uid, this.UserData.photoURL);
          this.ngZone.run(() => {
            this.sendEmailVerification();
            this.router.navigate(['/profile']);
          });
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }

    // Register user in Firestore
    registerUserInFirestore(name : string, mail : string, id : string, photo : string) {
      // Add a new document with a generated id.
      addDoc(collection(this.firestore, "users"), {
        username: name,
        email: mail,
        uid: id,
        photoURL: photo
      });
    }

    //Login Method
    Login(email : string, password : string){
      return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          this.router.navigate(['/profile']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }

 
   //Logout
    Logout() {
      signOut(this.auth).then(()=>this.router.navigate(['/login']))
    }


  //login with Email or Facebook
    //Login with Google
    GoogleAuth() {
      return this.loginWithPopup(new GoogleAuthProvider()).then(() => {
        this.registerUserInFirestore(this.UserData.displayName, this.UserData.email, this.UserData.uid, this.UserData.photoURL);
      });
    }


    //Pop Up Provider
    loginWithPopup(provider :any) {
      return signInWithPopup(this.auth,provider).then(() => {
        this.router.navigate(['profile']);
      });
    }


    //Send Password Reset Email
    async sendPasswordResetEmail(email : string){
       sendPasswordResetEmail(this.auth,email)
       .then(() => {
          window.alert('Password reset email sent, check your inbox.');
       })
       .catch((error) => {
        window.alert(error.message);
      });
    }

    //Send Email Verification
    sendEmailVerification(){
      return sendEmailVerification(this.auth.currentUser as User );
    }
}
