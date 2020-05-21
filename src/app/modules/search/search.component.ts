import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../core/services/search.service';
import {ToastrService} from 'ngx-toastr';
import {Artist} from '../../core/models/artist.model';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../core/services/auth.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {emptyFilled} from './search-annimation';
import {getNextToLastParentNode} from 'codelyzer/util/utils';

@Component({
  selector: 'app-posts',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [emptyFilled]
})
export class SearchComponent implements OnInit {
  currentState = 'empty';
  accessToken;
  queryField: FormControl = new FormControl();
  artistsList: Artist[];
  nextPageToken;
  previousPageToken;
  constructor(
    private toastr: ToastrService,
    private searchService: SearchService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.setAccessToken();
    this.handlePageTokens();
    this.searchArtist();
  }

  setAccessToken() {
    if (this.router.url.split('#')[1]) {
      this.accessToken = this.router.url.match(new RegExp('access_token=' + '(.*)' + '&token_type'))[1];
      this.authService.setcurrentToken(this.accessToken);
    } else if (localStorage.getItem('accessToken') === 'undefined' || !localStorage.getItem('accessToken')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  handlePageTokens() {
    this.searchService.nextPageToken.next(null);
    this.searchService.previousPageToken.next(null);
    this.searchService.$nextPageToken.subscribe(token => {
      this.nextPageToken = token;
    });
    this.searchService.$previousPageToken.subscribe(token => {
      this.previousPageToken = token;
    });
  }

  searchArtist() {
    this.queryField.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(queryField => {
        if (queryField) {
          this.currentState = 'filled';
          this.searchService.getArtists(queryField).subscribe(
            artists => {
              this.artistsList = artists;
            },
              error => {
                this.toastr.error(error, 'Error');
              });
        }
      });
  }

  getPageWithToken(token) {
    this.searchService.getArtistsWithToken(token === 'next' ? this.nextPageToken : this.previousPageToken).subscribe(artists => {
      this.artistsList = artists;
      window.scrollTo(0, 0);
      },
      error => {
        this.toastr.error(error, 'Error');
      });
  }

  getArtistAlbums(artistId, artistName) {
    this.searchService.artistNameSubject.next(artistName);
    this.router.navigate(['albums', artistId]);
  }

}
