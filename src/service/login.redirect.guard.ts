import { Router, CanActivateFn, CanMatchFn } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const loginRedirectGuard: CanActivateFn & CanMatchFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
      router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
