import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  public searchByRegion(query: Region) {
    this.selectedRegion = query;
    console.log(this.selectedRegion);
    this.countriesService
      .searchByRegion(query)
      .subscribe((countries) => (this.countries = countries));
  }
}
