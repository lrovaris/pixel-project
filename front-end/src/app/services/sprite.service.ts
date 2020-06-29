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
}
