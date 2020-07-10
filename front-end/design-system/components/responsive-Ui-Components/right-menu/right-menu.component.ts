import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'pixel-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit, AfterViewInit {

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {}


  AnimationArray;
  _ImageArray;
  @Input() set ImageArray(imgArray){
    if(imgArray === undefined){
      return
    }

    if(imgArray === this._ImageArray){
      return
    }

    this.setActiveSlide(0)
    this._ImageArray = imgArray
    this.AnimationArray = imgArray[0].metadata.animations

    this.cdRef.detectChanges();
  };

  rightSlide: any;
  activeSlide: any;
  leftSlide: any;

  stringkkk = 'kk';

  @Output() selectedAnimation = new EventEmitter()

  changeActiveSlide(activeSlide) {
    this.setActiveSlide(activeSlide)
  }

  ngAfterViewInit() {
    this.setActiveSlide(0)
  }

  setActiveSlide(newActiveSlide){

    if(this.AnimationArray === undefined){
      return;
    }

    this.activeSlide = newActiveSlide;

    if (this.activeSlide === this.AnimationArray.length - 1) {
      this.rightSlide = 0;
    } else {
      this.rightSlide = this.activeSlide + 1;
    }

    if (this.activeSlide === 0) {
      this.leftSlide = this.AnimationArray.length -1;
    } else {
      this.leftSlide = this.activeSlide - 1;
    }

  }

  emitSelectedAnimation(value) {
    this.selectedAnimation.emit(value);
  }

}
