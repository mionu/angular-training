import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AUTH_ACTIONS } from '../shared/actions.constants';
import { AuthorizationService } from './authorization.service';
import { LoadingService } from './loading.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private service: AuthorizationService,
    private loading: LoadingService
  ) { }

  @Effect() login$ = this.actions$.pipe(
    ofType(AUTH_ACTIONS.LOGIN),
    // @ts-ignore
    switchMap(action => this.service.login(action.payload)),
    map(res => {
      localStorage.setItem('fakeToken', res.token);
      return { type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res.token };
    }),
    catchError(() => of({ type: AUTH_ACTIONS.AUTH_ACTION_FAILED }))
  );

  @Effect() userInfo$ = this.actions$.pipe(
    ofType(AUTH_ACTIONS.LOGIN_SUCCESS),
    switchMap(() => this.service.getUserInfo()),
    map(res => {
      this.loading.hide();
      return { type: AUTH_ACTIONS.GET_USER_INFO, payload: res };
    }),
    catchError(() => of({ type: AUTH_ACTIONS.AUTH_ACTION_FAILED }))
  );

  @Effect({ dispatch: false }) logout$ = this.actions$.pipe(
    ofType(AUTH_ACTIONS.LOGOUT),
    tap(() => this.service.logout()),
    catchError(() => of({ type: AUTH_ACTIONS.AUTH_ACTION_FAILED }))
  );
}
