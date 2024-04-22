import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // import your Auth Service

@Injectable({ providedIn: 'root' })
export class RedirectGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // If the user is already logged in, redirect to the countries page.
      this.router.navigateByUrl('/countries');
      return false;
    }
    return true;
  }
}
