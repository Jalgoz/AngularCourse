import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styles: [],
})
export class DashboardLayoutComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  public user = computed(() => this.authService.currentUser());

  public logout(): void {
    this.authService.logout();
  }
}
