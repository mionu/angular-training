import { Action } from '@ngrx/store';
import { AUTH_ACTIONS } from 'src/app/shared/actions.constants';

export function userReducer(state: string = '', action: Action) {
  switch(action.type) {
    case AUTH_ACTIONS.GET_USER_INFO:
      // @ts-ignore
      return action.payload;
    default:
      return state;
  }
}
