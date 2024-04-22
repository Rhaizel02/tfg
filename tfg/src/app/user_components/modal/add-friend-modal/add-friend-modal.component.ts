import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AuthService } from 'src/app/services/firebase_auth/auth.service';

@Component({
  selector: 'app-add-friend-modal',
  templateUrl: './add-friend-modal.component.html',
  styleUrls: ['./add-friend-modal.component.css']
})
export class AddFriendModalComponent implements OnInit {
  addFriendForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddFriendModalComponent>,
    private firestoreService: FirebaseService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.addFriendForm = this.fb.group({
      friendUid: ['', [Validators.required]]
    });
  }

  addFriend() {
    if (this.addFriendForm.valid) {
      this.firestoreService.sendFriendRequest(
        this.authService.getAuthLocal().uid,
        this.addFriendForm.value.friendUid
      );
      this.dialogRef.close();
    }
  }
}
