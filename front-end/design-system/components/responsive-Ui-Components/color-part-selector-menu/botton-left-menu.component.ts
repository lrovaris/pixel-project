import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'pixel-botton-left-menu',
  templateUrl: './botton-left-menu.component.html',
  styleUrls: ['./botton-left-menu.component.scss'],
  animations: [
    trigger('active2', [
      state('initial', style({
        marginTop: '0'
      })),
      state('final', style({
        marginTop: '9px'
      })),
      transition('initial=>final', animate('100ms')),
      transition('final=>initial', animate('100ms'))
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
export class BottonLeftMenuComponent implements OnInit {

  @Input() colorsArray;

  @Output() index = new EventEmitter();

  selectedItem;

  currentStateArray = [];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      if (this.colorsArray !== undefined) {
        for (let i = 0; i < this.colorsArray.length; i++) {
          this.currentStateArray.push('initial');
        }
      }
    });
  }

  clickCard(index) {

    this.currentStateArray[index] = 'final';
    setTimeout(() => {
      this.currentStateArray[index] = 'initial';
    }, 300);
  }

  changeTheme(primary) {
    document.documentElement.style.setProperty('--color', `rgba(${primary.r},${primary.g},${primary.b},${primary.a})`);
  }

  listClick(event, newValue, index) {
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
    this.emitIndex(index);
  }

  emitIndex(index) {
    this.index.emit(index);
  }


}
