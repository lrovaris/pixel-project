import { Component, OnInit } from '@angular/core';
import {MetadataService} from '../../services/metadata.service';

import {ImageService} from '../../services/image.service';

@Component({
  selector: 'pixel-create-character-page',
  templateUrl: './create-character-page.component.html',
  styleUrls: ['./create-character-page.component.scss']
})
export class CreateCharacterPageComponent implements OnInit {

  imagesArray = [];

  metadataArray = [];

  selectAnimation: any;

  constructor(private metadataService: MetadataService, private imageService: ImageService) { }

  ngOnInit() {
    setTimeout( () => {
      setTimeout( () => {
        this.metadataArray = this.metadataService.getMetadata();

        const defaultImage = this.metadataArray[0];

        this.setBase(defaultImage);
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

  setBase(image){

    this.imageService.GetImage(image.path, (newPath) => {

      this.imagesArray = [];

      image.path = newPath;

      this.imagesArray.push(image);
    })

  }

}
