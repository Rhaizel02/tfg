import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase_auth/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent {
  constructor(public authService: AuthService) { }

  ngOnInit(): void {}
}
