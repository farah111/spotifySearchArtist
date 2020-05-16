import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ALBUMS, ARTISTS, BASE_API, SEARCH} from '../../../apiMap';
import {map, tap} from 'rxjs/operators';
import {Artist} from '../models/artist.model';
import { Observable, ReplaySubject} from 'rxjs';
import {Album} from '../models/album.model';

@Injectable()
export class SearchService {
  accessToken;
  artistNameSubject = new ReplaySubject<string>();
  $artistName = this.artistNameSubject.asObservable();
  constructor(protected http: HttpClient) { }

  getArtists(query): Observable<Artist []> {
    this.accessToken = localStorage.getItem('accessToken');
    if (!query || !this.accessToken || this.accessToken === 'undefined') {
      return;
    }
    return this.http.get(`${BASE_API}${SEARCH}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      params: {
        q: query,
        type: 'artist'
      }}).pipe(
        map(res => res['artists']['items'].map(artist => {
          return new Artist(artist);
        }))
    );
  }
  getArtistAlbums(artistId) {
    this.accessToken = localStorage.getItem('accessToken');
    if (!artistId || !this.accessToken || this.accessToken === 'undefined') {
      return;
    }
    return this.http.get(`${BASE_API}${ARTISTS}/${artistId}${ALBUMS}`,{
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    }).pipe(
       map(res => res['items'].map(album => {
        return new Album(album);
      }))
    );
  }
}
