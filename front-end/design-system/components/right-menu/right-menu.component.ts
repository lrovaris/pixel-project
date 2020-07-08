import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit, AfterViewInit {

  @Input() AnimationArray;
  @Input() ImageArray;

  rightSlide: any;
  activeSlide: any;
  leftSlide: any;

  stringkkk = 'kk';

  @Output() selectedAnimation = new EventEmitter()

  changeActiveSlide(activeSlide) {

    this.activeSlide = activeSlide;

    if (this.activeSlide === this.AnimationArray.length - 1) {
      this.rightSlide = 0;
    } else {
      this.rightSlide = this.activeSlide + 1;
    }

    if (this.activeSlide === 0) {
      this.leftSlide = this.AnimationArray.length - 1;
    } else {
      this.leftSlide = this.activeSlide - 1;
    }


  }

  constructor() { }

  ngOnInit() {
    this.activeSlide = 2;


    if (this.activeSlide === this.AnimationArray.length + 1) {
      this.rightSlide = 1;
    } else {
      this.rightSlide = this.activeSlide + 1;
    }

    if (this.activeSlide === 1) {
      this.leftSlide = this.AnimationArray.length + 1;
    } else {
      this.leftSlide = this.activeSlide - 1;
    }
  }

  ngAfterViewInit() {

    this.activeSlide = 2;

    if (this.activeSlide === this.AnimationArray.length + 1) {
      this.rightSlide = 1;
    } else {
      this.rightSlide = this.activeSlide + 1;
    }

    if (this.activeSlide === 1) {
      this.leftSlide = this.AnimationArray.length + 1;
    } else {
      this.leftSlide = this.activeSlide - 1;
    }

  }

  emitSelectedAnimation(value) {
    this.selectedAnimation.emit(value);
  }

}
