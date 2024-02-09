import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Subscription, filter, switchMap, tap } from 'rxjs';
import { Region, SmallCountry } from '../../interfaces/country.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit, OnDestroy {
  private regionSubscription: Subscription = new Subscription();
  private countrySubscription: Subscription = new Subscription();
  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];
  public myForm = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  public constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  public ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();
  }

  public ngOnDestroy(): void {
    // Clean up
    if (this.regionSubscription) {
      this.regionSubscription.unsubscribe();
    }

    if (this.countrySubscription) {
      this.countrySubscription.unsubscribe();
    }
  }

  public onRegionChange(): void {
    this.regionSubscription = this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.reset('')),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region as Region)
        )
      )
      .subscribe((countries) => {
        this.countriesByRegion = countries.sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
      });
  }

  public onCountryChange(): void {
    this.countrySubscription = this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.reset('')),
        filter((cca3) => !!cca3),
        switchMap((cca3) => this.countriesService.getCountryByAlphaCode(cca3!)),
        switchMap((country) =>
          this.countriesService.getCountryByBordersByCodes(country.borders)
        )
      )
      .subscribe((countries) => {
        this.borders = countries;
      });
  }

  public get regions() {
    return this.countriesService.regions;
  }
}
