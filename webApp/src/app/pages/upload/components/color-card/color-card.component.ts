import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-color-card',
  templateUrl: './color-card.component.html',
  styleUrls: ['./color-card.component.scss']
})
export class ColorCardComponent implements OnInit {

  @Input() color;

  oldColor: any;

  constructor() { }

  ngOnInit() {
    console.log(this.color);
    this.oldColor = this.color;
    this.color = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`;
  }

}
