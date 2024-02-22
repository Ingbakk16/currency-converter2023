import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { API } from '../constants/api';
import { Role } from '../interfaces/User';

import { Router } from '@angular/router';
import { AuthenticationRequestDto, User, UserForRegistrationDto } from '../interfaces/User';
import { UserServiceService } from './user-service.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
 
 
  constructor(private userService: UserServiceService) {
    // Check if the user is already authenticated based on the presence of a token
    this.isAuthenticated = !!localStorage.getItem('token');
    // Set the token from local storage
    this.token.set(localStorage.getItem('token'));
  }
  router = inject(Router);
  token:WritableSignal<string | null> = signal(null);
  private isAuthenticated: boolean = false;

  async login(loginData:AuthenticationRequestDto){
    try{
      const res = await fetch(API+"authentication/authenticate", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(loginData)
      })
      if(!res.ok) return false;
      const tokenRecibido = await res.text()
      console.log("LOGUEANDO",tokenRecibido)
      localStorage.setItem("token",tokenRecibido);
      this.token.set(tokenRecibido);
      return true;
    }
    catch{
      return false
    }
  }

  async register(registerData: UserForRegistrationDto) {
    try {
      const res = await fetch(API + "User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
  
      console.log("REGISTRANDO", res);
  
      return res;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Handle the error appropriately based on your application's requirements
    }
  }

  logOut(){
    this.token.set(null);
    localStorage.removeItem("token");
    this.router.navigate(["/home"]);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }



  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.sub; // Access 'sub' instead of 'userId'
    }
    return null;
  }


  isAdmin(): Observable<boolean> {
    return this.userService.getUserById(Number(this.getUserIdFromToken())).pipe(
      map(user => user.role === Role.Admin),
      catchError(() => of(false))
    );
  }

  

}

