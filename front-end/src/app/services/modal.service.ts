import { Injectable } from '@angular/core';

import { IpcService } from './ipc.service'

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ipc: IpcService) {

    this.ipc.on('new-project-command', (e, a) => {


      this.newProjectCallSource.next();

    })

  }

  private newProjectCallSource = new Subject<any>();

  newProjectCalled$ = this.newProjectCallSource.asObservable();
}
