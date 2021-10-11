import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import {Store} from '@ngrx/store';
import {Recipe} from '../recipes/recipe.model';
import {FIND_INGREDIENT, FindIngredient} from './store/shopping-list.action';
import {AppState, State} from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<State>;
  // ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.store.select('shoppingList').subscribe(data => this.ingredients = data.ingredients);
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    this.store.dispatch(new FindIngredient(index));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
