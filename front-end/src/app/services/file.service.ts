import { Injectable } from '@angular/core';
import { IpcService } from './ipc.service'
import { SpriteService } from './sprite.service'

import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private ipc: IpcService, private spriteService: SpriteService) {

    this.ipc.on('save-sprite-command', (e, a) => {

      this.SaveSprite('teste', this.spriteService.GetSprite(), (response) =>{

        console.log(response.message);

      })
    })

    this.ipc.on('load-sprite-command', (e, a) => {

      this.spriteService.LoadSprite(a);

    })

    this.ipc.on('export-sprite-command', (e, a) => {

      // this.ExportSprite();
      this.exportCallSource.next();

    })

  }

  private exportCallSource = new Subject<any>();

  exportCalled$ = this.exportCallSource.asObservable();


  public SaveSprite(fileName: string, imagesArray: any, callback: any) {

    if(fileName === undefined){
      return
    }

    if(imagesArray === undefined){
      return
    }

    this.ipc.once('save-sprite-reply', (e: any, a: any) => {
      if(a.name === fileName){
        callback(a);
      }

    });

    this.ipc.send('save-sprite', {
      name: fileName,
      data: imagesArray
    });

  }

  public ExportSprite(params) {

    const sprite = this.spriteService.GetSprite()

    if(sprite === undefined){
      return
    }

    this.ipc.once('export-sprite-reply', (e: any, a: any) => {
      console.log(a);
    });

    this.ipc.send('export-sprite', {
      sprite: sprite,
      params: params
    });
  }

  public PathDialog(callback: any) {

    this.ipc.once('save-dialog-reply', (e: any, a: any) => {

      callback(a)

    });

    this.ipc.send('save-dialog');

  }



}
