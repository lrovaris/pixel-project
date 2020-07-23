import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'pixel-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.scss'],
  animations: [
    trigger('active2', [
      state('initial', style({
        marginTop: '0'
      })),
      state('final', style({
        marginTop: '6px'
      })),
      transition('initial=>final', animate('70ms')),
      transition('final=>initial', animate('70ms'))
    ]),
    trigger('active', [
      state('initial', style({
        height: '9px',
        boxShadow: '0 4px 4px black',
        bottom: '-9px',
        border: '3px black solid',
      })),
      state('final', style({
        height: '0',
        boxShadow: '0 0 0 black',
        bottom: 0,
        border: '0 transparent solid',
      })),
      transition('initial=>final', animate('50ms')),
      transition('final=>initial', animate('50ms'))
    ])
  ]
})
export class SimpleButtonComponent implements OnInit {

  @Input() currentState;
  @Input() text;



  constructor() { }

  ngOnInit() {
  }

}
