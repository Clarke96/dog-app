import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DogModel } from './model/dog.model';

@Injectable({
  providedIn: 'root',
})
export class DataAccessService {
  constructor(private http: HttpClient) {}

  getAllDogs(): Observable<DogModel[]> {
    return this.http.get<DogModel[]>(
      'https://api.thedogapi.com/v1/breeds?limit=20&page=0'
    );
  }
}
