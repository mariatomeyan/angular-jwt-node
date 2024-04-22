import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,  } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn() && this.authService.hasRole('admin')) {
      return true;
    } else {
      console.error('Access denied - Admins only');
      return false;
    }
  }
}
