import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping list] Add Ingredient';
export const UPDATE_INGREDIENT = '[Shopping list] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping list] Delete Ingredient';
export const ADD_INGREDIENTS = '[Shopping list] Add Ingredients';

export const START_EIDT = 'START_EIDT';
export const STOP_EDIT = 'STOP_EDIT';

export class StartEdit implements Action {
  readonly type = START_EIDT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}
