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

  navigateTo(page){

    this.ngZone.run(() => {

      if (this.router.url === `/${page}`){
        return
      }

      this.router.navigate([page]);
      this.ipc.send('navigate', page);
    });

  }
}
