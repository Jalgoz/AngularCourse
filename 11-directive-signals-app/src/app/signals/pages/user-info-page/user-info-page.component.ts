import { Component, OnInit, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css'],
})
export class UserInfoPageComponent implements OnInit {
  private usersService = inject(UsersService);
  private _userId = signal(1);
  private _currentUser = signal<User | undefined>(undefined);
  private _userWasFound = signal(true);

  public ngOnInit(): void {
    this.loadUser(this.userId);
  }

  public get userId(): number {
    return this._userId();
  }

  public get currentUser(): User | undefined {
    return this._currentUser();
  }

  public get userWasFound(): boolean {
    return this._userWasFound();
  }

  public loadUser(id: number): void {
    if (id <= 0) {
      this._userWasFound.set(false);
      return;
    }

    this._userId.set(id);
    this._currentUser.set(undefined);
    this.usersService.getUserById(id).subscribe({
      next: (user) => {
        this._currentUser.set(user);
        this._userWasFound.set(true);
      },
      error: (error) => {
        this._userWasFound.set(false);
        this._currentUser.set(undefined);
        console.log('Error:', error);
      },
    });
  }
}
