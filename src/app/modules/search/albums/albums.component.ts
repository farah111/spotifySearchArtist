import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../../core/services/search.service';
import {ToastrService} from 'ngx-toastr';
import {Album} from '../../../core/models/album.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  artistId;
  artistName;
  albumsList: Album [];
  nextPageToken;
  previousPageToken;
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private titleService: Title,
    private router: Router) { }

  ngOnInit() {
    this.artistName = localStorage.getItem('artistName');
    this.handlePageTokens();
    this.getArtistAlbums();
  }

  handlePageTokens() {
    this.searchService.$nextPageAlbumToken.subscribe(token => {
      this.nextPageToken = token;
    });
    this.searchService.$previousPageAlbumToken.subscribe(token => {
      this.previousPageToken = token;
    });
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

  getAlbumsWithToken(token){
    this.searchService.getAlbumsWithToken(token === 'next' ? this.nextPageToken : this.previousPageToken).subscribe(
      albums => {
        this.albumsList = albums;
      }, error => this.toastr.error(error, 'Error')
    )
  }

}
