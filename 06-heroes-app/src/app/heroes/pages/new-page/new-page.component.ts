import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Hero, Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  public edit: boolean = false;

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.edit = true;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/heroes/list');

        this.heroForm.reset(hero);
        return;
      });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  public onSubmit() {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService
        .updateHeroById(this.currentHero, this.currentHero.id)
        .subscribe((hero) => {
          this.showSnackbar(`${hero.superhero} updated`);
        });

      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.router.navigateByUrl(`/heroes/hero/${hero.id}`);
      this.showSnackbar(`${hero.superhero} created`);
    });
  }

  public onDeleteHero() {
    if (!this.currentHero.id) throw Error('Id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.currentHero,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result === true),
        switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id)),
        tap((wasDeleted) => {
          if (wasDeleted === false) this.showSnackbar('Error deleting hero');
        }),
        filter((wasDeleted) => wasDeleted === true)
      )
      .subscribe(() => {
        this.router.navigateByUrl('/heroes/list');
        this.showSnackbar(`${this.currentHero.superhero} deleted`);
      });
  }

  public showSnackbar(message: string) {
    this.snackbar.open(message, 'done', {
      duration: 2500,
      horizontalPosition: 'end',
    });
  }
}
