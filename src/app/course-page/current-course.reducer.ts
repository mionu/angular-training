import { Action } from '@ngrx/store';
import { Course } from 'src/app/shared/courses/course.model';
import { COURSES_ACTIONS } from 'src/app/shared/actions.constants';

export function currentCourseReducer(state: Array<Course>, action: Action) {
  switch(action.type) {
    case COURSES_ACTIONS.COURSE_RECEIVED:
      // @ts-ignore
      return action.payload;
    default:
      return state;
  }
}
