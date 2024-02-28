import { Router } from '@angular/router';
import { Component, computed, effect, inject } from '@angular/core';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect(() => {
    console.log(this.authService.authStatus());
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        break;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        break;
      case AuthStatus.unauthenticated:
        this.router.navigateByUrl('/auth/login');
        break;
    }
  });
}
