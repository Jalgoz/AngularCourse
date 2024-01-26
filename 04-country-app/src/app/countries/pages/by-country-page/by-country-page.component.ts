import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent {
  public countries: Country[] = [];

  constructor(private countryService: CountriesService) {}

  public searchByCountry(query: string) {
    this.countryService
      .searchByCountry(query)
      .subscribe((countries) => (this.countries = countries));
  }
}
