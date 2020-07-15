import { Component, OnInit, ChangeDetectorRef } from '@angular/core';


import { IpcService } from '../../services/ipc.service'
import { MetadataService} from '../../services/metadata.service';
import { PaletteService } from '../../services/palette.service'
import { RouteService } from '../../services/route.service'
import { ImageService} from '../../services/image.service';


@Component({
  selector: 'pixel-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {

  check1 = false;
  check2 = false;
  check3 = false;
  isLoading = true

  constructor(
    private ipc: IpcService,
    private metadataService: MetadataService,
    private paletteService: PaletteService,
    private router: RouteService,
    private imageService: ImageService,
    private cdRef: ChangeDetectorRef
  ) { }

  metadataArray;

  ngOnInit() {
    setTimeout(() => {
      this.check1 = true;
      setTimeout(() => {
        this.check2 = true;
        setTimeout(() => {
          this.check3 = true;
        }, 100);
      }, 100);
    }, 100);

    let iterator = 0;

    this.ipc.once('load-metadata-reply', (e: any, a: any) => {
      this.metadataService.setMetadata(a);

      console.log(a);


      this.metadataArray = this.metadataService.getMetadata();

      this.metadataArray.forEach(metadataObj => {

        this.imageService.GetImage(metadataObj.path, (base64) => {

          metadataObj.defaultDisplay = base64;
          metadataObj.display = base64;

          console.log(this.metadataService.getMetadata());

        });

      });

      iterator++;

      if(iterator === 2){

        this.navigateHome()

      }
    });

    this.ipc.once('load-palettes-reply', (e: any, a: any) => {
      this.paletteService.setPalettes(a);
      iterator++;

      if(iterator === 2){

        this.navigateHome()

      }
    });

    this.ipc.send('load-metadata');
    this.ipc.send('load-palettes');
  }

  navigateHome(){

    this.isLoading = false

    console.log(this.isLoading);



    setTimeout(() => {

      this.router.navigateHome();

    }, 0);
  }

  log(x) {
    console.log(x);
  }

}
