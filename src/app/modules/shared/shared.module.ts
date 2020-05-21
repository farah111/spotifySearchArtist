import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import { CardComponent } from './card/card.component';
import {MatDialogModule} from '@angular/material';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [LoaderComponent, CardComponent, PaginatorComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
    exports: [LoaderComponent, CardComponent, PaginatorComponent]
})
export class SharedModule { }
