import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { DogModel } from 'src/app/shared/model/dog.model';
import { DogActions } from 'src/app/shared/state/dogs.actions';
import {
  selectFilteredDogsState,
  selectSelectedDog,
} from 'src/app/shared/state/dogs.selector';

@Component({
  selector: 'doggy-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit, OnDestroy {
  filteredIds$ = this.store.select(selectFilteredDogsState);
  filteredIds: Array<string> = [];
  dog$ = this.store.select(selectSelectedDog);
  dog?: DogModel;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<InfoComponent>
  ) {}

  ngOnInit(): void {
    this.dog$.pipe(takeUntil(this.destroyed$)).subscribe(dog => {
      if (dog) this.dog = dog;
    });

    this.filteredIds$.pipe(takeUntil(this.destroyed$)).subscribe(ids => {
      this.filteredIds = ids;
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  nextDog() {
    const currentIndex = this.filteredIds.indexOf(this.dog?.id || '');
    const newIndex =
      currentIndex === this.filteredIds.length - 1 ? 0 : currentIndex + 1;
    const dogId = this.filteredIds[newIndex];

    this.store.dispatch(DogActions.selectDog({ dogId }));
  }

  previousDog() {
    const currentIndex = this.filteredIds.indexOf(this.dog?.id || '');
    const newIndex =
      currentIndex === 0 ? this.filteredIds.length - 1 : currentIndex - 1;
    const dogId = this.filteredIds[newIndex];

    this.store.dispatch(DogActions.selectDog({ dogId }));
  }

  close() {
    this.dialogRef.close();
  }
}
