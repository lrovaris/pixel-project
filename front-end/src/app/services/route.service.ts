import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { IpcService } from './ipc.service'

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(
    private router: Router,
    private ipc: IpcService
  ) { }

  navigateTo(page){
    this.router.navigate([page]);
    this.ipc.send('navigate', page);
  }
}
