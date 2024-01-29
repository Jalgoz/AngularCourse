import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styles: [],
})
export class BasicsPageComponent {
  public nameLower: string = 'jose';
  public nameUpper: string = 'JOSE';
  public fullName: string = 'jOsE';
  public customDate: Date = new Date();
}
