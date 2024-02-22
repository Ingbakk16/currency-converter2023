import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  if (!auth.token() || !auth.isAdmin()) { // Add a check for admin role
    const router = inject(Router);
    router.navigate(['main']);
    return false;
  }
  return true;
};
