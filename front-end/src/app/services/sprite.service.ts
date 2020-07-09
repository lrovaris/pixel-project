import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpriteService {

  constructor() { }

  Sprite = [];

  BaseOfSprite;

  public GetSprite() {
    return this.Sprite;
  }

  public GetBaseOfSprite() {
    return this.BaseOfSprite;
  }

  public SetSprite(newSprite) {

    this.Sprite = newSprite;

    this.BaseOfSprite = this.Sprite.find(theBase => theBase.metadata.imgBase === true );


  }

  public push(image) {
    this.Sprite.push(image)
  }

  public remove(image) {

    this.Sprite = this.Sprite.filter((img) => {
      return img._id.toString() !== image._id.toString()
    });

  }
}
