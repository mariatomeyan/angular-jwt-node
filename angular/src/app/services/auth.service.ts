import { Injectable } from '@angular/core';
import {Observable, of, tap} from "rxjs";
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

interface IJWTBody {
  token: string;
  role: string;
  exp: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem('token');  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`; // Specify your login endpoint
    const body = { username, password };

    return this.http.post<{token: string}>(url, body)
      .pipe(
        tap(response => {
          if(response.token) {
            const decodedToken: IJWTBody = jwtDecode(response.token);

            const exp = decodedToken.exp;
            const username = decodedToken.username;
            const role = decodedToken.role;
            const token = decodedToken.token;

            if (exp < (new Date().getTime() + 1) / 1000) {
              console.log('Token is expired');
            } else {
              localStorage.setItem('token', response.token);
              localStorage.setItem('role', role);
              this.isAuthenticated = true;
            }
          }
        } )
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // also logout request to the web server
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  hasRole(role: string): boolean {
    return localStorage.getItem('role') === role;
  }

  getAuthorizationToken(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      return '';
    }
    return token;
  }
}
