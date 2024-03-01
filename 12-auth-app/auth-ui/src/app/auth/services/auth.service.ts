import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable, catchError, map, of, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  AuthStatus,
  CheckTokenResponse,
  LoginResponse,
  RegisterResponse,
  RegisterUser,
  User,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // We don't can change this variables because they are computed
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  public login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) =>
        this.setAuthentication(user, token, AuthStatus.authenticated)
      ),
      catchError((error) => {
        this._authStatus.set(AuthStatus.unauthenticated);

        return throwError(() => error.error);
      })
    );
  }

  public register(user: RegisterUser): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;

    return this.http.post<RegisterResponse>(url, user).pipe(
      map(({ user, token }) =>
        this.setAuthentication(user, token, AuthStatus.authenticated)
      ),
      catchError((error) => {
        this._authStatus.set(AuthStatus.unauthenticated);

        return throwError(() => error.error);
      })
    );
  }

  public logout(): void {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.unauthenticated);
    localStorage.removeItem('token');
  }

  private saveToken(token: string | null) {
    if (!token) return;

    localStorage.setItem('token', token!);
  }

  public checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) =>
        this.setAuthentication(user, token, AuthStatus.authenticated)
      ),
      catchError((error) =>
        of(this.setAuthentication(null, null, AuthStatus.unauthenticated))
      )
    );
  }

  private setAuthentication(
    user: User | null,
    token: string | null,
    status: AuthStatus
  ): boolean {
    this._currentUser.set(user);
    this._authStatus.set(status);
    this.saveToken(token);

    return status === AuthStatus.authenticated ? true : false;
  }
}
