import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/firebase_auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFriendModalComponent } from '../modal/add-friend-modal/add-friend-modal.component';
import { ConsoleLogger } from '@angular/compiler-cli';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user : any;
  recieved_requests : any[] = [];
  sent_requests : any[] = [];
  constructor(public authService: AuthService, public firestoreService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.authService.getAuthLocal();
    this.firestoreService.getReceivedFriendRequests(this.user.uid).subscribe((requests) => {
      this.recieved_requests = requests;
    });
    this.firestoreService.getSentFriendRequests(this.user.uid).subscribe((requests) => {
      this.sent_requests = requests;
    });
  }

  openAddFriendModal() {
    const dialogRef = this.dialog.open(AddFriendModalComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }
}
