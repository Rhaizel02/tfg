import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase_auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(public authService: AuthService) { }

  ngOnInit(): void {}
}
