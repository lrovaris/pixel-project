import { Component, Input, IterableDiffers, ViewChildren, QueryList, DoCheck } from '@angular/core';
import { ImageDisplayComponent } from "../image-display/image-display.component";

@Component({
  selector: 'pixel-animator',
  templateUrl: './animator.component.html',
  styleUrls: ['./animator.component.scss']
})
export class AnimatorComponent implements DoCheck {

  constructor(private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find(this.components).create();
  }

  @ViewChildren(ImageDisplayComponent) components:QueryList<ImageDisplayComponent>;

  @Input()
  set selectedAnimation(_selectAnimation){
    if(_selectAnimation === undefined){
      return
    }

    this.anim = _selectAnimation;

    this.stopAnimation();
    this.startAnimation();
  }

  @Input()
  set imagesArray(_imagesArray){
    if(_imagesArray === undefined){
      return;
    }

    if(_imagesArray.length > 0){

      this.images = _imagesArray

    }
  }

  private iterableDiffer: IterableDiffers;

  images = [];
  anim = 0;
  animationInterval;

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.components);
    if (changes) {

      this.stopAnimation();
      this.startAnimation();

    }
  }

  stopAnimation(){
    clearInterval(this.animationInterval);
  }

  startAnimation(){

    if(this.components === undefined){
      return
    }

    let imgArray = this.components.toArray();

    // Setando a posição inicial
    for (let index = 0; index < imgArray.length; index++) {
      imgArray[index].currentAnimation = this.anim
      imgArray[index].startAnim();
    }

    // Anima o personagem
    const speed = 98; // in millisecond(ms)

    this.animationInterval = setInterval(() => {

      if(imgArray.length === 0){
        return
      }

      if((imgArray[0].position + imgArray[0].width) < imgArray[0].finalPosition){

        for (let index = 0; index < imgArray.length; index++) {
          imgArray[index].stepAnim()
        }

      }else{

        for (let index = 0; index < imgArray.length; index++) {
          imgArray[index].resetAnim()
        }

      }

      for (let index = 0; index < imgArray.length; index++) {
        imgArray[index].renderSprite()
      }

    }, speed);

  }



}
