import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListAction from "./shopping-list.actions";

const initialState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
};
export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
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
  | ShoppingListAction.AddIngredients;
