import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pixel-image-in-list',
  templateUrl: './image-in-list.component.html',
  styleUrls: ['./image-in-list.component.scss']
})
export class ImageInListComponent implements OnInit {

  @Input() imgPath;
  @Input() set height(value) {
    if (value === undefined) {
      return;
    }

    this._height = value;
    this.scale = this.retornaScale();

  }
  @Input() width;

  _height: any;
  scale: any;

  constructor() { }

  ngOnInit() {

  }


  retornaScale() {

    let scala;

    if (this._height === 16) {
      scala = 'scale(4)';
    } else if (this._height === 32) {
      scala = 'scale(2)';
    } else if (this._height === 64) {
      scala = 'scale(1)';
    } else if (this._height === 128) {
      scala = 'scale(-2)';
    } else if (this._height === 256) {
      scala = 'scale(-4)';
    }


    return scala;

  }


}
