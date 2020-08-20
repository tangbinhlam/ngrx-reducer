import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../shared/ingredient.model';
import { StartEdit } from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients$ = this.store
      .select('shoppingList')
      .pipe(map((data) => data.ingredients));
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
