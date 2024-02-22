import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyConversionDto, CurrencyForCreationDto } from '../interfaces/Currency';
import { Observable, catchError, map, throwError } from 'rxjs';
import { API } from '../constants/api';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  private apiUrl = `${API}currency`; // Use the API constant for the base URL
  private conversionResult: any;


  constructor(private http: HttpClient, private auth: AuthService) { }

  getCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/currencies`);
  }
 
  convertCurrency(userId: number, conversionDto: CurrencyConversionDto): Promise<any> {
    const url = `${this.apiUrl}/convert${userId}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth.token(),
      },
      body: JSON.stringify(conversionDto), // Send conversionDto object as it is
    };
  
    return fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error during currency conversion');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error during currency conversion:', error);
        throw error; // Handle the error appropriately based on your application's requirements
      });
  }

  createCurrency(currencyData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth.token() 
      })
    };

    return this.http.post<any>(`${this.apiUrl}/create`, currencyData, httpOptions);
  }

  deleteCurrency(currencyId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth.token() 
      })
    };
  
    
  
    return this.http.delete<any>(`${this.apiUrl}/delete${currencyId}`, httpOptions);
  }



  getConversionResult(): any {
    return this.conversionResult;
  }



}




 
