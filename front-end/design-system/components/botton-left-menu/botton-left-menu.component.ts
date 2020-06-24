import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-botton-left-menu',
  templateUrl: './botton-left-menu.component.html',
  styleUrls: ['./botton-left-menu.component.scss']
})
export class BottonLeftMenuComponent implements OnInit {

  @Input() colorsArray;

  @Output() index = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  emitIndex(index) {
    this.index.emit(index);
  }

}
