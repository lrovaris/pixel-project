import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-botton-left-menu',
  templateUrl: './botton-left-menu.component.html',
  styleUrls: ['./botton-left-menu.component.scss']
})
export class BottonLeftMenuComponent implements OnInit {

  @Input() colorsArray;

  @Output() index = new EventEmitter();

  selectedItem;

  currentStateArray = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.colorsArray.length; i++) {
      this.currentStateArray.push('initial');
    }
  }

  changeTheme(primary) {
    console.log(primary);
    document.documentElement.style.setProperty('--color', `rgba(${primary.r},${primary.g},${primary.b},${primary.a})`);
  }

  listClick(event, newValue, index) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
    this.emitIndex(index);
  }

  emitIndex(index) {
    this.index.emit(index);
  }


}
