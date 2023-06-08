import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { DataAccessService } from '../data-access.service';
import { ApiActions, DogsActions, DogsAllActions } from './dogs.actions';

@Injectable()
export class DogEffects {
  loadOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ApiActions.retrievedDogsList),
      switchMap(() =>
        this.dataService.getAllDogs().pipe(
          switchMap(dogs => {
            const dogIds = dogs.map(dog => dog.id);
            return of(
              DogsAllActions.retrievedDogsList({ dogs }),
              DogsActions.modifyDogs({ dogIds })
            );
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private dataService: DataAccessService
  ) {}
}
