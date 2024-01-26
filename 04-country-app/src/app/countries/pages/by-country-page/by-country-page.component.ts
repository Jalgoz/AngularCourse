import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries;
    this.initialValue = this.countryService.cacheStore.byCountries.query!;
  }

  public searchByCountry(query: string) {
    this.countryService
      .searchByCountry(query)
      .subscribe((countries) => (this.countries = countries));
  }
}
