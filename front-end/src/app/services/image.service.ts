import { Injectable } from '@angular/core';
import { IpcService } from './ipc.service'


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private ipc: IpcService) {}

  public GetImage(imagePath: string, callback: any) {


    this.ipc.on('get-image-reply', (e: any, a: any) => {
      if(a.name === imagePath){
        callback(a.newImg);
      }
    });

    this.ipc.send('get-image', imagePath);

  }

  public ChangeImageColor(imagePath: string, old_color: any, new_color: any, callback: any) {

    this.ipc.on('change-color-reply', (e: any, a: any) => {
      console.log("recebe a resposta?");

      if(a.name === imagePath){
        callback(a.newImg);
      }
    });

    this.ipc.send('change-color', ({ path: imagePath, old_color: old_color, new_color: new_color }))
  }

}
