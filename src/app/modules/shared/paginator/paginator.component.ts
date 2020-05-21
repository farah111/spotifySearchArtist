import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() nextPageToken;
  @Input() previousPageToken;
  @Output() token = new EventEmitter();

  getPageWithToken(token) {
    this.token.emit(token);
  }

}
