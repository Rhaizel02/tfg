import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase_auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user = this.authService.UserData;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {}
}
