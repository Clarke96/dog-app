import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DogModel } from '../model/dog.model';

export const DogsActions = createActionGroup({
  source: 'Dogs',
  events: {
    'Modify Dogs': props<{ dogIds: Array<string> }>(),
  },
});

export const DogActions = createActionGroup({
  source: 'Dog',
  events: {
    'Select Dog': props<{ dogId: string }>(),
  },
});

export const DogsAllActions = createActionGroup({
  source: 'Dogs API',
  events: {
    'Retrieved Dogs List': props<{ dogs: Array<DogModel> }>(),
  },
});

export const ApiActions = createActionGroup({
  source: 'API',
  events: {
    'Retrieved Dogs List': emptyProps(),
  },
});
