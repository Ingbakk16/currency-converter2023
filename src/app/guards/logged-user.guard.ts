import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';


export const loggedUserGuard:  CanActivateFn =  (route, state) => {
  const auth = inject(AuthService);
  if(!auth.token()){
    const router = inject(Router);
    router.navigate(['login']);
    return false;
  }
  return true;
};
