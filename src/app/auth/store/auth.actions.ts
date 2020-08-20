import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payLoad: User) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthAction = Login | Logout;
