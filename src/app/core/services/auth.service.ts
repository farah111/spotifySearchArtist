import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;
  constructor() {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('accessToken'));
    if (!this.currentUserSubject) {
      this.logout();
    }
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.clear();
  }

  public get currentToken(): string {
    return this.currentUserSubject.value;
  }

  public setcurrentToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
    this.currentUserSubject.next(accessToken);
  }
}
