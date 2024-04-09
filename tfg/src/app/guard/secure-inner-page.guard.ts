import { CanActivateFn } from '@angular/router';
import { AuthService } from "../services/firebase_auth/auth.service";
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const secureInnerPageGuard: CanActivateFn = () => {
  // Inject the AuthService
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    router.navigate(['/profile']); // O la ruta que consideres adecuada para usuarios ya autenticados
    return false;
  }
  return true;

};



