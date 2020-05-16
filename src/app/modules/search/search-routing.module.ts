import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search.component';
import {AlbumsComponent} from './albums/albums.component';


const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'albums/:id',
    component: AlbumsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
