import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromIngredients from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe$: Observable<Recipe>;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.recipe$ = this.route.params.pipe(
      map((params) => +params['id']),
      switchMap((id) => {
        return this.store.select('recipes').pipe(map((res) => res.recipes[id]));
      }),
    );
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new fromIngredients.AddIngredients(ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
