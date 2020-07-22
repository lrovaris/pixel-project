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
    if (this.colorsArray !== undefined) {
      for (let i = 0; i < this.colorsArray.length; i++) {
        this.currentStateArray.push('final');
      }
    }
  }

  clickCard(index) {
    this.currentStateArray[index] = 'initial';
    setTimeout(() => {
      this.currentStateArray[index] = 'final';
    }, 300);
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
