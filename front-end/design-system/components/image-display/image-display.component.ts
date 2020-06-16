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
  @Input() animation;
  @Input() selectedAnimation;

 animationInterval;

 spriteSheet = document.getElementById(this.id);

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

    let position = 0;
    let finalPosition = 0;


    if (this.selectedAnimation > this.animation.length) {
      alert('selected animation doesn`t exist');
    }

    if (this.selectedAnimation === 0 ) {
      position = this.width;
      finalPosition = this.width * this.animation[0].frames;
    } else {
      for (let i = 0; i < this.selectedAnimation; i++) {

        position = position + (this.animation[i].frames * this.width);

      }
    }



    const speed = 98; // in millisecond(ms)
    const diff = this.width; // difference between two sprites
    this.spriteSheet.style.backgroundPosition = `${-position}px 0px`;
    this.animationInterval = setInterval(() => {


      if (position < finalPosition) {
        this.spriteSheet.style.backgroundPosition = `${-position}px 0px`;
        position = position + diff;
      } else {

        position = 0;
        finalPosition = 0;

        if (this.selectedAnimation === 0 ) {
          position = this.width;
          finalPosition = this.width * this.animation[0].frames;
        } else {

          for (let i = 0; i <= this.selectedAnimation - 1; i++) {
            position = position + (this.animation[i].frames * this.width);
          }
          for (let i = 0; i <= this.selectedAnimation; i++) {
            finalPosition = finalPosition + (this.animation[i].frames * this.width);
          }
          

        }

        this.spriteSheet.style.backgroundPosition = `${-position}px 0px`;
       // if (positionY < this.height) {}
      }
    }, speed);
  }

  shouldIAnimate() {
    this.shouldAnimate = !this.shouldAnimate;
  }


}
