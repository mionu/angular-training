import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { COURSES_ACTIONS } from '../shared/actions.constants';
import { CoursesService } from './courses.service';
import { LoadingService } from '../core/loading.service';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private service: CoursesService,
    private loading: LoadingService
  ) { }

  @Effect() getCourses$ = this.actions$.pipe(
    ofType(COURSES_ACTIONS.GET_COURSES_LIST),
    // @ts-ignore
    switchMap(action => this.service.getCoursesList(action.payload)),
    map(res =>  {
      this.loading.hide();
      return { type: COURSES_ACTIONS.COURSES_RECEIVED, payload: res };
    }),
    catchError(() => of({ type: COURSES_ACTIONS.COURSES_ACTION_FAILED }))
  );
}
