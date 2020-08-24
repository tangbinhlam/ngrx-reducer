import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as RecipiesActions from './recipe.actions';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipiesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>('https://recipe-book-56f68.firebaseio.com/recipes.json')
        .pipe(
          map((recipes) => {
            return recipes.map((recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          }),
          map((recipes) => {
            return new RecipiesActions.SetRecipes(recipes);
          }),
        );
    }),
  );

  @Effect()
  storeRecipes = this.actions$.pipe(
    ofType(RecipiesActions.STORE_RECIPES),
    switchMap((recipes) => {
      return this.http.put(
        'https://recipe-book-56f68.firebaseio.com/recipes.json',
        recipes,
      );
    }),
  );
}
