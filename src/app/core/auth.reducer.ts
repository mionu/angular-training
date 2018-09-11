import { Action } from '@ngrx/store';
import { AUTH_ACTIONS } from 'src/app/shared/actions.constants';

export function authReducer(state: string = '', action: Action) {
  switch(action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      // @ts-ignore
      return action.payload;
    case AUTH_ACTIONS.LOGOUT:
      return '';
    default:
      return state;
  }
}
