import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { DataAccessService } from '../shared/data-access.service';
import { DogModel } from '../shared/model/dog.model';
import { ApiActions, DogsActions } from '../shared/state/dogs.actions';
import { selectDogs } from '../shared/state/dogs.selector';

@Component({
  selector: 'doggy-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private store: Store, private dataService: DataAccessService) {}
  allDogs$ = this.store.select(selectDogs);
  allDogs: Array<DogModel> = [];
  searchWordSubject = new BehaviorSubject('');
  searchWord$ = this.searchWordSubject.asObservable();
  filterSearch = new FormControl('');

  ngOnInit(): void {
    this.store.dispatch(ApiActions.retrievedDogsList());
    this.allDogs$.subscribe(allDogs => (this.allDogs = allDogs));
  }

  search(): void {
    const allLowerCase =
      this.filterSearch.value?.toLowerCase().replace(/ /g, '') || '';
    const dogIds = this.allDogs
      .filter(dog =>
        dog.name.toLowerCase().replace(/ /g, '').includes(allLowerCase)
      )
      .map(dog => dog.id);
    this.store.dispatch(DogsActions.modifyDogs({ dogIds }));
    this.searchWordSubject.next(this.filterSearch.value || '');
  }

  resetSearch(): void {
    this.searchWordSubject.next('');
    this.store.dispatch(ApiActions.retrievedDogsList());
    this.filterSearch.setValue('');
  }
}
