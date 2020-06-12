import {Component, OnInit} from '@angular/core';
import {IpcService} from "./services/ipc.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front-end';

  constructor(private ipc: IpcService) {

  }

  ngOnInit() {
    this.ipc.send('load-metadata');
  }

}
