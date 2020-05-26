import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ALBUMS, ARTISTS, BASE_API, SEARCH} from '../../../apiMap';
import {map, tap} from 'rxjs/operators';
import {Artist} from '../models/artist.model';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {Album} from '../models/album.model';

@Injectable()
export class SearchService {
  accessToken;
  nextPageToken = new BehaviorSubject<any>('');
  $nextPageToken = this.nextPageToken.asObservable();
  previousPageToken = new BehaviorSubject<any>('');
  $previousPageToken = this.previousPageToken.asObservable();
  nextPageAlbumToken = new BehaviorSubject<any>('');
  $nextPageAlbumToken = this.nextPageAlbumToken.asObservable();
  previousPageAlbumToken = new BehaviorSubject<any>('');
  $previousPageAlbumToken = this.previousPageAlbumToken.asObservable();
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
        q: query ? query : '',
        type: 'artist'
      }}).pipe(
        tap(res => {
            this.nextPageToken.next(res['artists']['next']);
            this.previousPageToken.next(res['artists']['previous']);
        }),
        map(res => res['artists']['items'].map(artist => {
          return new Artist(artist);
        }))
    );
  }

  getArtistsWithToken(tokenLink) {
    return this.http.get(tokenLink, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      params: {
        type: 'artist'
      }}).pipe(
      tap(res => {
        this.nextPageToken.next(res['artists']['next']);
        this.previousPageToken.next(res['artists']['previous']);
      }),
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
      tap(res => {
        this.nextPageAlbumToken.next(res['next']);
        this.previousPageAlbumToken.next(res['previous']);
      }),
       map(res => res['items'].map(album => {
        return new Album(album);
      }))
    );
  }

  getAlbumsWithToken(tokenLink) {
    return this.http.get(tokenLink,{
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    }).pipe(
      tap(res => {
        this.nextPageAlbumToken.next(res['next']);
        this.previousPageAlbumToken.next(res['previous']);
      }),
      map(res => res['items'].map(album => {
        return new Album(album);
      }))
    );
  }
}
