import {Ingredient} from '../../shared/ingredient.model';
import {Action} from '@ngrx/store';
import * as ShoppingListAction from './shopping-list.action';
import {ShoppingListActions} from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient ;
  editedIngredientIndex: number;
}
export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT :
      // state.ingredients.push(action.payload);
      // return state;
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListAction.ADD_INGREDIENTS :
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListAction.UPDATE_INGREDIENT : {
      const ingredients: Ingredient[] = [...state.ingredients];
      ingredients[action.payload.index] = action.payload.newIngredient;
      return {
        ...state,
        ingredients
      };
    }
    case ShoppingListAction.FIND_INGREDIENT :
      console.log('index', action.payload);
      return {
        ...state,
        editedIngredient: state.ingredients[action.payload],
        editedIngredientIndex: action.payload
      };
    case ShoppingListAction.STOP_EDIT :
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListAction.DELETE_INGREDIENT : {
      // const ingredients: Ingredient[] = [...state.ingredients];
      // ingredients.splice(action.payload, 1);
      // console.log(ingredients);
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, index) => {
          return index !== action.payload;
        })
      };
    }
    default:
      return state;
  }
}
