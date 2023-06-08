import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MainBodyComponent } from './main-body/main-body.component';
import { DogTileComponent } from './dog-tile/dog-tile.component';
import { InfoComponent } from './info/info.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MainBodyComponent, DogTileComponent, InfoComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [MainBodyComponent],
})
export class BodyModule {}
