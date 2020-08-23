import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP),
    switchMap((authData: AuthActions.Signup) => {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          },
        )
        .pipe(
          map((resData: AuthResponseData) => {
            return this.handleAuthentication(resData);
          }),
          catchError(this.handleError),
        );
    }),
  );

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
            return this.handleAuthentication(resData);
          }),
          catchError(this.handleError),
        );
    }),
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/recipes']);
    }),
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) {}

  private handleAuthentication(resData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000,
    );
    return new AuthActions.Login({
      email: resData.email,
      userId: resData.localId,
      token: resData.idToken,
      expirationDate,
    });
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(new AuthActions.LoginFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return of(new AuthActions.LoginFail(errorMessage));
  }
}
