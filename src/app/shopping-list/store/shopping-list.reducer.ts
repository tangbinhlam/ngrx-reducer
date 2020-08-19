import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};
export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions,
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListAction.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient, index) => index !== action.payload,
        ),
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    default:
      return state;
  }
}

export type ShoppingListActions =
  | ShoppingListAction.AddIngredient
  | ShoppingListAction.UpdateIngredient
  | ShoppingListAction.DeleteIngredient
  | ShoppingListAction.AddIngredients;
