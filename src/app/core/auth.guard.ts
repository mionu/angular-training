import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { RouterPaths } from '../app-routing/app-routing.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthorizationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.getUserInfo().pipe(
        map(user => {
          if (user && user.login) {
            this.authService.currentUser = user;
            return true;
          }
          this.router.navigate([RouterPaths.LOGIN]);
          return false;
        })
      );
  }
}
