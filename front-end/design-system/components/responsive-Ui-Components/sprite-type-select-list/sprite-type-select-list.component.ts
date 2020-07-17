import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-sprite-type-select-list',
  templateUrl: './sprite-type-select-list.component.html',
  styleUrls: ['./sprite-type-select-list.component.scss']
})
export class SpriteTypeSelectListComponent implements OnInit {

  @Output() routeDestination = new EventEmitter();

  spriteList = [];

  constructor() { }

  ngOnInit() {

  }

  emitRouteDestination(route) {
    this.routeDestination.emit(route);
  }
}
