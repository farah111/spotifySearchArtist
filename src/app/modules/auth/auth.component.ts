import { Component } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  login() {
    window.location.replace(`https://accounts.spotify.com/authorize?client_id=${environment.clientId}&response_type=token&redirect_uri=http:%2F%2Flocalhost:4200%2Fsearch`);
  }
}
