import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { IpcService } from './ipc.service'

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(
    private router: Router,
    private ipc: IpcService,
    private ngZone: NgZone
  ) { }

  aditionalParams;

  public getParams(){
    return this.aditionalParams;
  }

  public navigateTo(page, aditionalParams = undefined){

    this.ngZone.run(() => {

      if (this.router.url === `/${page}`){
        return
      }

      this.aditionalParams = aditionalParams;
      this.router.navigate([page]);
      this.ipc.send('navigate', page);
    });

  }
}
