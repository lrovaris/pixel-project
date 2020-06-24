import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit {

  @Input() pallete;

  @Output() color = new EventEmitter();

  colorsArray = [];

  constructor() { }

  ngOnInit() {
    console.log(this.pallete);
    setTimeout(() => {
      this.colorsArray = this.pallete[1].colors;
      console.log(this.colorsArray);
    }, 3000);
  }

  emitColor(color) {
    this.color.emit(color);
  }

}
