import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payLoad: User) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthAction = Login | Logout;
