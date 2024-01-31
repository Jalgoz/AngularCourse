import { Component } from '@angular/core';
import { Color, Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'products-order',
  templateUrl: './order.component.html',
  styles: [],
})
export class OrderComponent {
  public isUpperCase: boolean = false;
  public sortBy: keyof Hero | '' = '';
  public heroes: Hero[] = [
    {
      name: 'Superman',
      canFly: true,
      color: Color.blue,
    },
    {
      name: 'Batman',
      canFly: false,
      color: Color.black,
    },
    {
      name: 'Robin',
      canFly: false,
      color: Color.green,
    },
    {
      name: 'Daredevil',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Thor',
      canFly: true,
      color: Color.red,
    },
    {
      name: 'Hulk',
      canFly: false,
      color: Color.green,
    },
    {
      name: 'Ironman',
      canFly: true,
      color: Color.red,
    },
    {
      name: 'Spiderman',
      canFly: false,
      color: Color.blue,
    },
    {
      name: 'Vision',
      canFly: true,
      color: Color.green,
    },
    {
      name: 'Wanda',
      canFly: false,
      color: Color.red,
    },
  ];

  public toggleUpperCase(): void {
    this.isUpperCase = !this.isUpperCase;
  }

  public changeSort(sortBy: keyof Hero | ''): void {
    this.sortBy = sortBy;
  }
}
