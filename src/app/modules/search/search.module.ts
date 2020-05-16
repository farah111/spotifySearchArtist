import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {SearchRoutingModule} from './search-routing.module';
import {SearchService} from '../../core/services/search.service';
import {SharedModule} from '../shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import {ReactiveFormsModule} from '@angular/forms';
import {FillPipe} from '../../core/pipes/fill-pipe';
import { AlbumsComponent } from './albums/albums.component';

@NgModule({
  declarations: [SearchComponent, FillPipe, AlbumsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    SharedModule,
    NgxJsonViewerModule
  ],
  providers: [
    SearchService,
  ]
})
export class SearchModule { }
