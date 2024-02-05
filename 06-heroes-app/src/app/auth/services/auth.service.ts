import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import type { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = environment.apiUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    // return structuredClone(this.user); // Not supported
    return { ...this.user };
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/1`).pipe(
      tap((user: User) => (this.user = user)),
      tap((user: User) => localStorage.setItem('token', user.id.toString()))
    );
  }

  public checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.url}/users/${token}`).pipe(
      tap((user: User) => (this.user = user)),
      map((user: User) => !!user),
      catchError(() => of(false))
    );
  }

  public logout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }
}
