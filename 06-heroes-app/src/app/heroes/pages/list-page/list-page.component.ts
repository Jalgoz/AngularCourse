import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import type { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  // Generally the http request should be done in the ngOnInit lifecycle hook
  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}
