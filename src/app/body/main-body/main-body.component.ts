import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DogModel } from 'src/app/shared/model/dog.model';
import { DogActions } from 'src/app/shared/state/dogs.actions';
import { selectFilteredDogs } from 'src/app/shared/state/dogs.selector';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'doggy-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss'],
})
export class MainBodyComponent {
  dogs$ = this.store.select(selectFilteredDogs);
  dogs: DogModel[] = [];
  @Input() searchWord$: Observable<string> = of('');
  @Output() resetSearch = new EventEmitter(true);

  constructor(private store: Store, private dialog: MatDialog) {}

  openDialog(dogId: string) {
    this.store.dispatch(DogActions.selectDog({ dogId }));
    this.dialog.open(InfoComponent, {
      maxHeight: '600px',
      maxWidth: '800px',
    });
  }

  clearSearch() {
    this.resetSearch.emit(true);
  }
}
