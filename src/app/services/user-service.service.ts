import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API } from '../constants/api';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

 
  constructor(private http: HttpClient) { }

  upgradeToPremium(userId: number): Observable<any> {
    const url = `${API}user/upgrade-to-premium/${userId}`; // Build the URL using the API constant
    return this.http.put<any>(url, {});
  }

  


  



  getUserById(userId: number): Observable<User> {
    const url = `${API}user/${userId}`; // Assuming you have an endpoint for fetching user by ID
    return this.http.get<User>(url);
  }


}
