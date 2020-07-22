import {Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {randomBytes} from "crypto";


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

  constructor() {
  }

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

  @Input() set selectedAnimation(anim){
    if(anim === undefined){ return; }

    this.currentAnimation = anim;
  }

  currentAnimation;

  spriteSheet = document.getElementById(this.id);

  initialPosition = 0;
  position = 0;
  finalPosition = 0;

  ngOnInit() {
    this.id = this.id + Math.round(Math.random() * 1E9);

    setTimeout(() => {
      this.spriteSheet = document.getElementById(this.id);
    });
  }

  startAnim(){

    this.initialPosition = 0;
    this.finalPosition = this.width * this.animation[0].frames

    for (let index = 0; index < this.currentAnimation; index++) {

      this.initialPosition = this.finalPosition

      this.finalPosition +=  this.width * this.animation[index+1].frames
    }

    this.position = this.initialPosition;
  }

  resetAnim(){
    this.position = this.initialPosition;
  }

  stepAnim(){
    this.position += this.width;
  }

  renderSprite(){
    if(this.spriteSheet === null){
      return;
    }

    this.spriteSheet.style.backgroundPosition = `${-this.position}px 0px`;
  }
}
