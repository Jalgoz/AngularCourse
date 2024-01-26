import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.query!;
  }

  searchByCapital(query: string): void {
    this.countriesService.searchByCapital(query).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
