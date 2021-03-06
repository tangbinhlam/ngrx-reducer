import { User } from '../user.model';
import * as fromAuthActions from './auth.actions';
export interface State {
  user: User;
  authMessage: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authMessage: null,
  loading: false,
};

export function authReducer(
  state: State = initialState,
  action: fromAuthActions.AuthAction,
) {
  switch (action.type) {
    case fromAuthActions.LOGIN:
      const user = new User(
        action.payLoad.email,
        action.payLoad.userId,
        action.payLoad.token,
        action.payLoad.expirationDate,
      );
      return {
        ...state,
        user: user,
        loading: false,
      };
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case fromAuthActions.LOGIN_START:
    case fromAuthActions.SIGN_UP:
      return {
        ...state,
        authMessage: null,
        loading: true,
      };
    case fromAuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authMessage: action.payload,
        loading: false,
      };
    case fromAuthActions.CLEAR_ERROR:
      return {
        ...state,
        authMessage: null,
      };
    default:
      return state;
  }
}
