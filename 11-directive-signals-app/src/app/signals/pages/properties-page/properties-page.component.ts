import { Component, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css'],
})
export class PropertiesPageComponent {
  public user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  });
  public userChangedEffect = effect(() => {
    console.log(this.user().first_name);
  });

  public onFieldUpdated(field: keyof User, value: string): void {
    // console.log(`Field "${field}" was updated with value "${value}"`);
    this.user.update((user) => ({ ...user, [field]: value }));
  }
}
