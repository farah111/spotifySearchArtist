import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import { CardComponent } from './card/card.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [LoaderComponent, CardComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [LoaderComponent, CardComponent]
})
export class SharedModule { }
