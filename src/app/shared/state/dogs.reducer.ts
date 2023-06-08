import { createReducer, on } from '@ngrx/store';
import { DogModel } from '../model/dog.model';
import { DogActions, DogsActions, DogsAllActions } from './dogs.actions';

export const initialStateFiltered: Array<string> = [];
export const initialStateAll: Array<DogModel> = [];
export const initialStateSelected = '';

export const filteredDogsReducer = createReducer(
  initialStateFiltered,
  on(DogsActions.modifyDogs, (_state, { dogIds }) => dogIds)
);

export const allDogsReducer = createReducer(
  initialStateAll,
  on(DogsAllActions.retrievedDogsList, (_state, { dogs }) => dogs)
);

export const selectedDogReducer = createReducer(
  initialStateSelected,
  on(DogActions.selectDog, (_state, { dogId }) => dogId)
);
