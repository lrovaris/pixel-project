import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {

  @Input() AnimationArray;
  @Input() ImageArray;

  stringkkk = 'kkk';

  @Output() selectedAnimation = new EventEmitter()

  constructor() { }

  ngOnInit() {

  }

  emitSelectedAnimation(value) {
    this.selectedAnimation.emit(value);
  }

}
