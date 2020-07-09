import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pixel-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.scss']
})
export class SimpleButtonComponent implements OnInit {

  @Input() text;

  constructor() { }

  ngOnInit() {
  }

}
