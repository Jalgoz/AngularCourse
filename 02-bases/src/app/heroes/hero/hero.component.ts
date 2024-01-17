import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  public name: string = 'iron man';
  public age: number = 45;

  get capitalizedName(): string | undefined {
    return this.name?.toUpperCase();
  }

  getHeroDescription(): string {
    return `${this.name} - ${this.age}`;
  }

  changeName(): void {
    this.name = 'Hulk';
  }

  changeAge(): void {
    this.age = 55;
  }

  reset(): void {
    this.name = 'iron man';
    this.age = 45;
  }
}
