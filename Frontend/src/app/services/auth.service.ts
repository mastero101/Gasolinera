import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        if (response.token && response.role) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', response.role);
          this.authStatus.next(true);
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.authStatus.next(false);
  }
}
