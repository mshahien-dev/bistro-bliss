import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './data-flow.service';
import { map, of } from 'rxjs';

export const adminGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const loggedIn = await auth.isLoggedIn();

  if (loggedIn) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
