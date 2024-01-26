import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of, tap } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import type { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: {
      query: '',
      countries: [],
    },
    byCountries: {
      query: '',
      countries: [],
    },
    byRegion: {
      region: '',
      countries: [],
    },
  };

  constructor(private http: HttpClient) {
    this.getFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private getFromLocalStorage(): void {
    if (localStorage.getItem('cacheStore')) {
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  public searchByCapital(query: string): Observable<Country[]> {
    return this.searchBy('capital', query).pipe(
      tap((countries) => (this.cacheStore.byCapital = { query, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchByCountry(query: string): Observable<Country[]> {
    return this.searchBy('name', query).pipe(
      tap((countries) => (this.cacheStore.byCountries = { query, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchByRegion(query: Region): Observable<Country[]> {
    return this.searchBy('region', query).pipe(
      tap(
        (countries) => (this.cacheStore.byRegion = { region: query, countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  private searchBy(property: string, query: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/${property}/${query}`)
      .pipe(catchError(() => of([])));
  }
}
