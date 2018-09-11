import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { COURSES_ACTIONS } from '../actions.constants';
import { CoursesService } from './courses.service';
import { LoadingService } from '../../core/loading.service';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private service: CoursesService,
    private loading: LoadingService,
    private route: ActivatedRoute,
    private location: Location
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

  @Effect() deleteCourse$ = this.actions$.pipe(
    ofType(COURSES_ACTIONS.DELETE_COURSE),
    // @ts-ignore
    switchMap(action => this.service.removeCourse(action.payload)),
    map(() =>  {
      const params = this.route.snapshot.queryParams;
      return { type: COURSES_ACTIONS.GET_COURSES_LIST, payload: params };
    }),
    catchError(() => of({ type: COURSES_ACTIONS.COURSES_ACTION_FAILED }))
  );

  @Effect({ dispatch: false }) updateCourse$ = this.actions$.pipe(
    ofType(COURSES_ACTIONS.UPDATE_COURSE),
    // @ts-ignore
    switchMap(action => this.service.updateCourse(action.payload)),
    map(() =>  {
      this.location.back();
    }),
    catchError(() => of({ type: COURSES_ACTIONS.COURSES_ACTION_FAILED }))
  );

  @Effect({ dispatch: false }) createCourse$ = this.actions$.pipe(
    ofType(COURSES_ACTIONS.CREATE_COURSE),
    // @ts-ignore
    switchMap(action => this.service.createCourse(action.payload)),
    map(() =>  {
      this.location.back();
    }),
    catchError(() => of({ type: COURSES_ACTIONS.COURSES_ACTION_FAILED }))
  );

  @Effect() getCourseById$ = this.actions$.pipe(
    ofType(COURSES_ACTIONS.GET_COURSE_BY_ID),
    // @ts-ignore
    switchMap(action => this.service.getCourseById(action.payload)),
    map((course) =>  {
      return { type: COURSES_ACTIONS.COURSE_RECEIVED, payload: course };
    }),
    catchError(() => of({ type: COURSES_ACTIONS.COURSES_ACTION_FAILED }))
  );
}
