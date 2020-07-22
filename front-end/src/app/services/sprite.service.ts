import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { RouteService } from './route.service'

@Injectable({
  providedIn: 'root'
})
export class SpriteService {

  constructor(private router: RouteService) { }

  private loadSpriteCallSource = new Subject<any>();

  loadSpriteCalled$ = this.loadSpriteCallSource.asObservable();

  Sprite = [];

  BaseOfSprite;

  public GetSprite() {
    return this.Sprite;
  }

  public GetBaseOfSprite() {
    return this.BaseOfSprite;
  }

  public LoadSprite(newSprite) {

    console.log('load sprite called');

    this.SetSprite(newSprite)

    this.loadSpriteCallSource.next();

    this.router.navigateTo(newSprite[0].metadata.spriteType.toLowerCase())

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
