import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DogModel } from 'src/app/shared/model/dog.model';

@Component({
  selector: 'doggy-dog-tile',
  templateUrl: './dog-tile.component.html',
  styleUrls: ['./dog-tile.component.scss'],
})
export class DogTileComponent {
  @Input() dog: DogModel = {
    weight: {
      imperial: '',
      metric: '',
    },
    height: {
      imperial: '',
      metric: '',
    },
    id: '',
    name: '',
    bred_for: '',
    breed_group: '',
    life_span: '',
    temperament: '',
    origin: '',
    reference_image_id: '',
    image: {
      id: '',
      width: 0,
      height: 0,
      url: '',
    },
  };
  @Output() openDialog = new EventEmitter<string>();

  expandTile() {
    this.openDialog.next(this.dog.id);
  }
}
