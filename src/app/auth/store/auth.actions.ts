import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const SIGN_UP = '[Auth] Sign Up';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(
    public payLoad: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    },
  ) {}
}
export class Signup implements Action {
  readonly type = SIGN_UP;
  constructor(public payload: { email: string; password: string }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {}
}

export type AuthAction = Login | Logout | LoginFail | LoginStart | Signup;
