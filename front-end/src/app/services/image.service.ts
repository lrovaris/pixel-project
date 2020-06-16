import { Injectable } from '@angular/core';
import { IpcService } from "./ipc.service"


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private ipc: IpcService) {}

  /**
   * GetImage
   */
  public GetImage(imagePath:string, callback:any) {
    this.ipc.on("get-image-reply", (e:any, a:any) =>{

      callback(a);
    });

    this.ipc.send("get-image", imagePath);
  }

}
