import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of } from 'rxjs';

import { HEROES } from 'src/app/constants/path';
import { environment } from 'src/environments/environment';
import type { Hero } from '../interfaces/hero.interface';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/${HEROES}`);
  }

  public getHeroById(id: string): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/${HEROES}/${id}`).pipe(
      // The pipe is used to combine multiple operators into a single function
      catchError((error) => {
        // Add catchError operator to handle errors and return an observable of undefined
        console.error(error);
        return of(undefined);
      })
    );
  }

  public getSuggestions(query: string): Observable<Hero[]> {
    console.log(`${this.baseUrl}/${HEROES}?q=${query}&_limit=6`);
    return this.httpClient.get<Hero[]>(
      `${this.baseUrl}/${HEROES}?superhero_like=${query}&_limit=6`
    );
  }
}
