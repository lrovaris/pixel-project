import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-color-card',
  templateUrl: './color-card.component.html',
  styleUrls: ['./color-card.component.scss']
})
export class ColorCardComponent implements OnInit {

  @Input() color;

  oldColor: any;

  @Input() secondColor;

  savecolor: any;

  constructor() { }

  ngOnInit() {

    this.oldColor = this.color;
    this.color = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`;
  }

  onClick() {
    this.savecolor = this.color;
    this.color = 'rgba(0,0,0,0)';
    setTimeout(() => {
      this.color = this.savecolor;
    }, 150);
  }

}
