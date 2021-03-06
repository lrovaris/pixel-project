import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'pixel-inner-border-and-botton-box',
  templateUrl: './inner-border-and-botton-box.component.html',
  styleUrls: ['./inner-border-and-botton-box.component.scss'],
  animations: [
    trigger('active', [
      state('initial', style({
        height: '0',
        boxShadow: '0 0 0 black',
        bottom: 0,
        border: '0 transparent solid',
      })),
      state('final', style({
        height: '9px',
        boxShadow: '0 4px 4px black',
        bottom: '-9px',
        border: '3px black solid',
      })),
      transition('initial=>final', animate('300ms')),
      transition('final=>initial', animate('300ms'))
    ])
  ]
})
export class InnerBorderAndBottonBoxComponent implements OnInit {

  @Input() currentState = 'initial';

  constructor() { }

  ngOnInit() {
  }

}
