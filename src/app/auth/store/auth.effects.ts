import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';
import { AuthResponseData } from '../auth.service';
import { of } from 'rxjs';
import { User } from '../user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          },
        )
        .pipe(
          map((resData: AuthResponseData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000,
            );
            const user = new User(
              resData.email,
              resData.localId,
              resData.idToken,
              expirationDate,
            );
            return of(new AuthActions.Login(user));
          }),
          catchError((error) => {
            return of();
          }),
        );
    }),
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
