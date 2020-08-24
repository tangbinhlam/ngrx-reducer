import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logout } from '../auth/store/auth.actions';
import * as fromRecipe from '../recipes/store/recipe.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isAuthenticated$ = of(false);

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.select('auth').pipe(
      map((auth) => {
        return auth.user !== null && auth.user.token !== null;
      }),
    );
  }

  onSaveData() {
    this.store.dispatch(new fromRecipe.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new fromRecipe.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }
}
