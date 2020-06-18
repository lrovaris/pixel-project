import { Component, OnInit} from '@angular/core';
import { IpcService} from './services/ipc.service';
import { MetadataService} from './services/metadata.service';
import { PaletteService} from './services/palette.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front-end';

  constructor(private ipc: IpcService, private metadataService: MetadataService, private paletteService: PaletteService) {

  }

  ngOnInit() {
    this.ipc.on('load-metadata-reply', (e: any, a: any) => {
      this.metadataService.setMetadata(a);      
    });

    this.ipc.on('load-palettes-reply', (e: any, a: any) => {
      this.paletteService.setPalettes(a);
    });

    this.ipc.send('load-metadata');
    this.ipc.send('load-palettes');
  }

}
