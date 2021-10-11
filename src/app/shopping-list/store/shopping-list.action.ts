import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const FIND_INGREDIENT = 'FIND_INGREDIENT';
export const STOP_EDIT = 'STOP_EDIT';
export const GET_INGREDIENT = 'GET_INGREDIENT';
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {
  }
}

export class AddIngredients implements Action {
  readonly type =  ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {
  }
}
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: {index: number, newIngredient: Ingredient}) {
  }
}
export class DeleteIngredient implements Action {
  readonly type =  DELETE_INGREDIENT;
  constructor(public payload: number) {
  }
}
export class FindIngredient implements Action {
  readonly type = FIND_INGREDIENT;
  constructor(public payload: number) {
  }
}
// export class GetIngredient implements Action {
//   readonly type = GET_INGREDIENT;
//   constructor(public payload: number) {
//   }
// }
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}
export type ShoppingListActions = AddIngredients | AddIngredient | UpdateIngredient | DeleteIngredient | FindIngredient | StopEdit;
