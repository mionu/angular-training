import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizationService } from './authorization.service';
import { RouterPaths } from '../app-routing/app-routing.constants';

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
            this.authService.currentUser.next(user);
            return true;
          }
          this.router.navigate([RouterPaths.LOGIN]);
          return false;
        })
      );
  }
}
