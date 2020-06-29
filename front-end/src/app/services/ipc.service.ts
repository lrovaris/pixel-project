import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  private ipc: IpcRenderer | undefined = void 0;

  constructor() {
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  public on(channel: string, listener): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.on(channel, listener);
  }

  public send(channel: string, ...args): void {

    if (!this.ipc) {
      console.log(this.ipc);
      return;
    }

    this.ipc.send(channel, ...args);
  }

  public once(channel: string, listener): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.once(channel, listener);
  }


}
