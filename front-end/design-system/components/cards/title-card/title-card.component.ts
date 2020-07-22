import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pixel-title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.scss']
})
export class TitleCardComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
