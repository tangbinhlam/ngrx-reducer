import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from '../auth/store/auth.reducer';
import * as fromShoppingReducer from '../shopping-list/store/shopping-list.reducer';

export interface AppState {
  shoppingList: fromShoppingReducer.State;
  auth: fromAuthReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingReducer.shoppingListReducer,
  auth: fromAuthReducer.authReducer,
};
