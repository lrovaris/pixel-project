import { Component, OnInit } from '@angular/core';
import {MetadataService} from '../../services/metadata.service';

import {ImageService} from '../../services/image.service';
import {PaletteService} from '../../services/palette.service';

@Component({
  selector: 'pixel-create-character-page',
  templateUrl: './create-character-page.component.html',
  styleUrls: ['./create-character-page.component.scss']
})
export class CreateCharacterPageComponent implements OnInit {

  imagesArray = [];

  metadataArray = [];

  selectAnimation = 1;

  constructor(private metadataService: MetadataService, private imageService: ImageService, public palletService: PaletteService) { }

  ngOnInit() {
    setTimeout( () => {
      setTimeout( () => {
        this.metadataArray = this.metadataService.getMetadata();

        // Setup displays ou algo assim
        let iterator = 0;

        this.metadataArray.forEach(metadataObj => {

          this.imageService.GetImage(metadataObj.path, (base64) => {

            metadataObj.defaultDisplay = base64;
            metadataObj.display = base64;
            iterator++;

            if(iterator === this.metadataArray.length) {
              const defaultImage = this.metadataArray[0];

              this.setBase(defaultImage);
            }
          })

        })

      });
    }, 1000);

    this.selectAnimation = 0;
  }

  changeAniamtion() {
    if (this.selectAnimation === 0 ) {
      this.selectAnimation = 1;
    } else {
      this.selectAnimation = 0;
    }
  }

  pushImage(image) {
    this.setBase(image);
  }

  setBase(image) {

    this.imageService.ChangeImageColor(image.path, [
      { old_color: image.metadata.colors[0], new_color: {r: 0, g: 0, b:0, a: 255} },
      { old_color: image.metadata.colors[1], new_color: {r: 50, g: 50, b:50, a: 255} }
    ], (base64) => {

      this.imagesArray = [];

      image.display = base64;

      this.imagesArray.push(image);

    });


  }

  receivColor(color) {

    const image = this.imagesArray[0];

    this.imageService.ChangeImageColor(image.path, [
      { old_color: image.metadata.colors[0], new_color: color }
    ], (base64) => {

      this.imagesArray = [];

      image.display = base64;

      this.imagesArray.push(image);

    });

  }

}
