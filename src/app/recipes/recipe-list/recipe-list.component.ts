import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.recipes$ = this.store
      .select('recipes')
      .pipe(map((recipes) => recipes.recipes));
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
