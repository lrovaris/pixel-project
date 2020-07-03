import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpriteService {

  constructor() { }

  Sprite = [];

  public GetSprite() {
    return this.Sprite;
  }

  public SetSprite(newSprite) {

    this.Sprite = newSprite

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
