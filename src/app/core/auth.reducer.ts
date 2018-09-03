import { Action } from '@ngrx/store';
import { LOGIN_SUCCESS } from 'src/app/shared/actions.constants';

export function authReducer(state: string = '', action: Action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
    // @ts-ignore
      return action.payload;
    default:
      return state;
  }
}
