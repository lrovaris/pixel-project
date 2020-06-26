import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pixel-card-animation',
  templateUrl: './card-animation.component.html',
  styleUrls: ['./card-animation.component.scss']
})
export class CardAnimationComponent implements OnInit {

   @Input() height;
   @Input() width;
   @Input() frames;
   @Input() spriteWidth;
   @Input() id;
   @Input() selectedAnimation;
   @Input() animation;
   @Input() imgPath;
   @Input() Animation;

   scale: any;

  constructor() { }

  ngOnInit() {
    this.scale = 5;
    // console.log(this.animation);
  }

}
