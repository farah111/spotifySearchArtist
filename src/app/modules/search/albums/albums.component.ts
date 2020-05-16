import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../../core/services/search.service';
import {ToastrService} from 'ngx-toastr';
import {Album} from '../../../core/models/album.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  artistId;
  artistName;
  albumsList: Album [];
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('artistName')) {
      this.searchService.$artistName.subscribe(artistName => {
        this.artistName = artistName;
        localStorage.setItem('artistName', artistName);
      });
    } else {
      this.artistName = localStorage.getItem('artistName');
    }

    this.getArtistAlbums();
  }

  getArtistAlbums() {
    this.artistId = this.route.params.subscribe(params => {
      if (!params['id']) {
        this.toastr.error('Please choose an artist', 'Error');
        this.router.navigate(['/search']);
        return;
      }
      this.artistId = params['id'];
      this.searchService.getArtistAlbums(this.artistId).subscribe(albums => {
        this.albumsList = albums;
      }, error => this.toastr.error(error, 'Error'));
    });
  }

}
