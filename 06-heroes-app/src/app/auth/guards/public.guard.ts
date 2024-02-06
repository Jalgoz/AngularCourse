import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { filter, map, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

const CanActivate: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['/heroes']);
      }
    }),
    map((isAuthenticated) => !isAuthenticated)
  );
};

export const PublicGuard = {
  CanActivate,
};
