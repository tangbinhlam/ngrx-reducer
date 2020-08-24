import { Injectable } from '@angular/core';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as RecipiesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {}

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

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipiesActions.STORE_RECIPES),
    withLatestFrom(
      this.store
        .select('recipes')
        .pipe(map((recipesState) => recipesState.recipes)),
    ),
    switchMap(([actionData, recipes]) => {
      return this.http.put(
        'https://recipe-book-56f68.firebaseio.com/recipes.json',
        recipes,
      );
    }),
  );

  @Effect({ dispatch: false })
  deleteRedirect = this.actions$.pipe(
    ofType(RecipiesActions.DELETE_RECIPE),
    tap(() => {
      this.router.navigate(['/recipes']);
    }),
  );
}
