import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DogModel } from '../model/dog.model';

export const selectDogs = createFeatureSelector<Array<DogModel>>('allDogs');

export const selectFilteredDogsState =
  createFeatureSelector<Array<string>>('filteredDogs');

export const selectSelectedDogState =
  createFeatureSelector<string>('selectedDog');

export const selectFilteredDogs = createSelector(
  selectDogs,
  selectFilteredDogsState,
  (allDogs, filteredDogs) => {
    return filteredDogs.map(id => allDogs.find(dog => dog.id === id));
  }
);

export const selectSelectedDog = createSelector(
  selectDogs,
  selectSelectedDogState,
  (allDogs, selectedDog) => {
    return allDogs.find(dog => dog.id === selectedDog);
  }
);
