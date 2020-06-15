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

  @Input() frames;
  @Input() width;
  @Input() height;
  @Input() spriteWidth;
  @Input() imgPath;

   animationInterval;
   spriteSheet = document.getElementById('image');
   widthOfSpriteSheet = 500;
   widthOfEachSprite = 50;

  newWidth: any;
  newHeight: any;

  position = 256;
  interval = 100;
  shouldAnimate = false;


  constructor() {
  }

  ngOnInit() {
    this.spriteSheet = document.getElementById('image');
    console.log(document.getElementById('image'));

    this.startAnimation();

  }

  animate(frameWidth) {

    const turns = (frameWidth);

    document.getElementById('image').style.backgroundPosition = `-${frameWidth}px 0px`;

  }

  stopAnimation() {
    clearInterval(this.animationInterval);
  }

  startAnimation() {
    console.log(this.spriteSheet);
    let position = 50; // start position for the image
    const speed = 100; // in millisecond(ms)
    const diff = 50; // difference between two sprites

    this.animationInterval = setInterval(() => {
      console.log('asd');
      this.spriteSheet.style.backgroundPosition = `${-position}px 0px`;

      console.log(this.spriteSheet.style.backgroundPosition);

      if (position < this.widthOfSpriteSheet) {
        position = position + diff;
      } else {
        position = this.widthOfEachSprite;
      }
    }, speed);
  }

  shouldIAnimate() {
    this.shouldAnimate = !this.shouldAnimate;
    console.log(this.shouldAnimate);
  }


}
