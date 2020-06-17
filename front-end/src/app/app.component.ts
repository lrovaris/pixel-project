import { Component, OnInit} from '@angular/core';
import { IpcService} from './services/ipc.service';
import { MetadataService} from './services/metadata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front-end';

  constructor(private ipc: IpcService, private metadataService: MetadataService) {

  }

  ngOnInit() {
    this.ipc.send('load-metadata');
    this.ipc.on('load-metadata-reply', (e: any, a: any) => {
      console.log(a);
      console.log('aaa');
      this.metadataService.setMetadata(a);
    });
  }

}
