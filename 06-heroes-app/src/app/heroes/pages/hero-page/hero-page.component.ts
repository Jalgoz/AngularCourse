import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import type { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [],
})
export class HeroPageComponent implements OnInit {
  public hero: Hero | undefined;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id)) // switchMap is used to cancel the previous subscription and return a new observable.
      )
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/heroes/list']);

        return (this.hero = hero);
      });
  }

  public goBack(): void {
    this.router.navigate(['/heroes/list']);
  }
}
