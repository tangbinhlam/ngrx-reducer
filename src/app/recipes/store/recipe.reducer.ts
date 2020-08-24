import { Recipe } from '../recipe.model';
import * as fromRecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
  editedRecipes: Recipe;
  editedRecipesIndex: number;
}
const initialState: State = {
  recipes: [],
  editedRecipes: null,
  editedRecipesIndex: -1,
};

export function recipeReducer(
  state = initialState,
  action: fromRecipeActions.RecipeActions,
) {
  switch (action.type) {
    case fromRecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case fromRecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter((recipe, index) => index !== action.payload),
        ],
      };
    case fromRecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    default:
      return state;
  }
}
