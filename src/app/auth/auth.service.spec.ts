import { inject, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthService } from './auth.service';
import * as AuthState from './store/auth.reducer';
describe('AuthService', () => {
  let mockStore: MockStore<AuthState.State>;

  const initialState: AuthState.State = {
    user: null,
    authMessage: null,
    loading: false,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideMockStore({ initialState })],
    });
  });
  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
