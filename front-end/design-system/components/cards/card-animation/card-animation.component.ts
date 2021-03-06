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
   @Input() imagesArray;
   @Input() marginTop;
   @Input() transformScale;
   @Input() marginLeft;
   @Input() opacity;

   scale: any;

  constructor() { }

  ngOnInit() {
    this.id = this.id + 'kkk';
    this.scale = 5;

    if (Animation === undefined) {
      this.Animation = [];
    }

  }

}
