import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, combineLatest, map, of, tap } from 'rxjs';

import { Country, Region, SmallCountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseUrl = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [
    Region.Africa,
    Region.America,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  public constructor(private http: HttpClient) {}

  public get regions(): Region[] {
    return [...this._regions]; // Break the reference to the original array
  }

  public getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);

    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url).pipe(
      map((countries: Country[]) =>
        countries.map((country: Country) => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders || [],
        }))
      )
    );
  }

  public getCountryByAlphaCode(cca3: string): Observable<SmallCountry> {
    const url: string = `${this.baseUrl}/alpha/${cca3}?fields=cca3,name,borders`;

    return this.http.get<Country>(url).pipe(
      map((country: Country) => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders || [],
      }))
    );
  }

  public getCountryByBordersByCodes(
    borders: string[]
  ): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of([]);

    const countryRequests: Observable<SmallCountry>[] = [];

    borders.forEach((border) => {
      const request: Observable<SmallCountry> =
        this.getCountryByAlphaCode(border);
      countryRequests.push(request);
    });

    return combineLatest(countryRequests);
  }
}
