import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {Store} from '@ngrx/store';
import {
  ADD_INGREDIENT,
  AddIngredient,
  DeleteIngredient, StopEdit,
  UPDATE_INGREDIENT,
  UpdateIngredient
} from '../store/shopping-list.action';
import {State} from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Observable<State>;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor(private slService: ShoppingListService,
              private store: Store<{shoppingList: State}>) { }

  ngOnInit() {
    // this.subscription = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.slService.getIngredient(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       });
    //     }
    //   );
    this.subscription = this.store.select('shoppingList');
    this.subscription.subscribe(data => {
      // console.log(data.ingredients)\
      if (data.editedIngredientIndex !== -1) {
        this.editedItemIndex = data.editedIngredientIndex;
        this.editMode = true;
        this.editedItem = data.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new UpdateIngredient({index: this.editedItemIndex, newIngredient}));
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new AddIngredient(newIngredient));

    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new StopEdit());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEdit());
  }

}
