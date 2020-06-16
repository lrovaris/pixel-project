import {Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'pixel-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss'],
  animations: [
    trigger('change', [
      // ...
      state('open', style({
        backgroundPosition: '0px'
      })),
      state('closed', style({
        backgroundPosition: '-500px'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ]),
  ],
})


export class ImageDisplayComponent implements OnInit {

  @ViewChild('image', { static: false }) public image: ElementRef;
  @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;

  @Input() frames;
  @Input() width;
  @Input() height;
  @Input() spriteWidth;
  @Input() imgPath;
  @Input() name;
  @Input() id;

   animationInterval;
   spriteSheet = document.getElementById(this.id);
   widthOfSpriteSheet: any;
   widthOfEachSprite: any;

  position = 256;
  interval = 100;
  shouldAnimate = false;


  constructor() {
  }

  ngOnInit() {

    setTimeout(() => {
      this.spriteSheet = document.getElementById(this.id);
      setTimeout(() => {
       this.startAnimation();
     });
    });
  }



  stopAnimation() {
    clearInterval(this.animationInterval);
  }

  startAnimation() {


    this.widthOfSpriteSheet = this.spriteWidth;

    let position = this.width; // start position for the image
   // let positionY = this.width;
    const speed = 100; // in millisecond(ms)
    const diff = this.width; // difference between two sprites


    this.animationInterval = setInterval(() => {

      this.spriteSheet.style.backgroundPosition = `${-position}px 0px`;
      if (position < this.widthOfSpriteSheet) {
        position = position + diff;
      } else {
        position = this.width;
       // if (positionY < this.height) {}
      }
    }, speed);
  }

  shouldIAnimate() {
    this.shouldAnimate = !this.shouldAnimate;
  }


}
