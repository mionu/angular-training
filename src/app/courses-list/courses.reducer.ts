import { Action } from '@ngrx/store';
import { Course } from '../shared/courses/course.model';
import { COURSES_ACTIONS } from 'src/app/shared/actions.constants';

export function coursesReducer(state: Array<Course>, action: Action) {
  switch(action.type) {
    case COURSES_ACTIONS.COURSES_RECEIVED:
      // @ts-ignore
      return action.payload;
    default:
      return state;
  }
}
