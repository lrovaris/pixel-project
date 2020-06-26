import { Injectable } from '@angular/core';
import { IpcService } from './ipc.service'


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private ipc: IpcService) {

    this.ipc.on('save-sprite-command', (e, a) => {

      this.SaveSprite('teste', this.imagesArray, (response) =>{

        console.log(response.message);

      })




    })

  }

  imagesArray;

  public SetImageArray(imagesArray: any) {
    this.imagesArray = imagesArray;
  }

  public SaveSprite(fileName: string, imagesArray: any, callback: any) {

    if(fileName === undefined){
      return
    }

    if(imagesArray === undefined){
      return
    }

    this.ipc.on('save-sprite-reply', (e: any, a: any) => {
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
