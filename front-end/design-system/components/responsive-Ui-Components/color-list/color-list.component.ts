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
    this.colorsArray = this.pallete[1].colors;
  }

  emitColor(color) {
    this.color.emit(color);
  }

}
