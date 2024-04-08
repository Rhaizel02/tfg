import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase_auth/auth.service';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public authService: AuthService) { }

  ngOnInit(): void {}
}
