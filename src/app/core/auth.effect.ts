import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { BASE_URL, AUTH_PATH } from 'src/app/core/constants';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from 'src/app/shared/actions.constants';

@Injectable()
export class AuthEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) { }

  @Effect() login$ = this.actions$.pipe(
    ofType(LOGIN),
    switchMap(payload => this.http.post(`${BASE_URL}${AUTH_PATH}`, payload)),
    map(res => ({ type: LOGIN_SUCCESS, payload: res })),
    catchError(() => of({ type: LOGIN_FAILED }))
  );
}
