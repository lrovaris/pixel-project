import { Injectable } from '@angular/core';
import { IpcService } from './ipc.service'
import { SpriteService } from './sprite.service'


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

      this.spriteService.SetSprite(a)

    })

  }

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

}
