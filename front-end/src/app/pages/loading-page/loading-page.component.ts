import {Component, OnInit, ChangeDetectorRef, NgZone} from '@angular/core';


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

  constructor(
    private ipc: IpcService,
    private metadataService: MetadataService,
    private paletteService: PaletteService,
    private router: RouteService,
    private imageService: ImageService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
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

    this.ipc.once('load-metadata-reply', (e: any, a: any)  => {
      this.metadataService.setMetadata(a);

      this.metadataArray = this.metadataService.getMetadata();

      let i = 0;
      this.metadataArray.forEach(metadataObj => {


        this.imageService.GetImage(metadataObj.path, (base64) => {

          metadataObj.defaultDisplay = base64;
          metadataObj.display = base64;
          i++;


          if(i === this.metadataArray.length){

            iterator++;

            if(iterator === 2){

              this.ngZone.run(() => this.navigateHome());

            }

          }

        });

      });


    });

    this.ipc.once('load-palettes-reply', (e: any, a: any) => {
      this.paletteService.setPalettes(a);
      iterator++;

      if(iterator === 2){

        this.ngZone.run(() => this.navigateHome());

      }
    });

    this.ipc.send('load-metadata');
    this.ipc.send('load-palettes');
  }

  navigateHome(){
    this.cdRef.detectChanges();
    this.router.navigateHome();
  }
}
