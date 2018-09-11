import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterPaths } from '../app-routing/app-routing.constants';
import { User } from 'src/app/core/user.model';
import { AUTH_ACTIONS } from '../shared/actions.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: Observable<User>

  constructor(
    private router: Router,
    private store: Store<any>
  ) {
    // @ts-ignore
    this.user = store.pipe(select('user'));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const fakeToken = localStorage.getItem('fakeToken');
      if (!fakeToken) {
        this.router.navigate([RouterPaths.LOGIN]);
        return false;
      }
      this.store.dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: fakeToken});
      return true;
  }
}
