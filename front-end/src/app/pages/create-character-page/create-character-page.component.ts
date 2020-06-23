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

  selectedColorIndex: any;

  colors = [];

  constructor(private metadataService: MetadataService, private imageService: ImageService, public palletService: PaletteService ) { }

  ngOnInit() {
    this.selectedColorIndex = 0;
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

      image.originalColors = image.metadata.colors;
      image.currentColors = [];

      this.imagesArray = [];
      this.imagesArray.push(image);


  }

  receivColor(color, index) {

    const image = this.imagesArray[0];

    let thisColor = image.currentColors.find(color => color.index === index);

    if(thisColor !== undefined){
      thisColor.color = color
      thisColor.index = index
    }

    else{
      image.currentColors.push({
        color: {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        },
        index: index
      })
    }

    let changes = [];

    for (let i = 0; i < image.currentColors.length; i++) {

      changes.push({
        old_color: image.originalColors[image.currentColors[i].index],
        new_color: image.currentColors[i].color
      })

    }

    this.imageService.ChangeImageColor(image.path, changes, (base64) => {

      this.imagesArray = [];

      image.display = base64;

      this.imagesArray.push(image);

      this.colors = []

      for (let i = 0; i < image.originalColors.length; i++) {

        let currentColorForIndex = image.currentColors.find(currCol => {
          return currCol.index === i
        })

        if (currentColorForIndex === undefined){
          this.colors.push(image.originalColors[i])
        }else{
          this.colors.push({
            r: currentColorForIndex.color.r,
            g: currentColorForIndex.color.g,
            b: currentColorForIndex.color.b,
            a: currentColorForIndex.color.a,
            name: image.originalColors[i].name
          })
        }
      }


    });

  }

  receivIndex(index) {
    this.selectedColorIndex = index;
  }

}
