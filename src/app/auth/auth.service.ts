import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppState from '../store/app.reducer';
import * as fromAuthActions from './store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private store: Store<fromAppState.AppState>) {}

  setLogoutTimmer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new fromAuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimmer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
