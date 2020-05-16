import {animate, state, style, transition, trigger} from '@angular/animations';

export const emptyFilled = trigger('emptyFilled', [
  state('empty', style({
    height: '100%'
  })),
  state('filled', style({
    height: '100px'
  })),
  transition('empty => filled', [
    animate('1s')
  ]),
  transition('filled => empty', [
    animate('0.5s')
  ]),
]);
