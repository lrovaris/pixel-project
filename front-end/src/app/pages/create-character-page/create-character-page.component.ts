import { Component, OnInit } from '@angular/core';

import {MetadataService} from '../../services/metadata.service';
import {ImageService} from '../../services/image.service';
import {PaletteService} from '../../services/palette.service';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'pixel-create-character-page',
  templateUrl: './create-character-page.component.html',
  styleUrls: ['./create-character-page.component.scss']
})
export class CreateCharacterPageComponent implements OnInit {

  imagesArray = [];

  lastSelection;

  metadataArray = [];

  selectAnimation = 1;

  selectedColorIndex: any;

  colors = [];

  constructor(
    private metadataService: MetadataService,
    private imageService: ImageService,
    public palletService: PaletteService,
    private fileService: FileService
  ) { }

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


  pushImage(image) {

    let currentImage = this.imagesArray.find(img => img._id.toString() === image._id.toString())

    if(currentImage !== undefined){
      this.lastSelection = currentImage
      this.colors = currentImage.metadata.colors;
      return;
    }

    image.originalColors = image.metadata.colors;
    image.currentColors = [];

    this.imagesArray.push(image);


    this.colors = this.imagesArray[this.imagesArray.length-1].metadata.colors;
    this.lastSelection = this.imagesArray[this.imagesArray.length-1]
    this.fileService.SetImageArray(this.imagesArray)
  }

  setBase(image) {

      image.originalColors = image.metadata.colors;
      image.currentColors = [];

      this.imagesArray = [];
      this.imagesArray.push(image);
      this.colors = this.imagesArray[0].metadata.colors;
      this.lastSelection = this.imagesArray[0]
      this.fileService.SetImageArray(this.imagesArray)
  }

  receivColor(color, index) {

    const image = this.lastSelection

    color.a = image.originalColors[index].a

    let thisColor = image.currentColors.find(color => color.index === index);

    if(thisColor !== undefined){
      thisColor.color = color
      thisColor.index = index
    }

    else{
      image.currentColors.push({
        color: color,
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

      image.display = base64;

      this.pushImage(image)

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

  receivAnimation(index) {
    this.selectAnimation = index;
  }

}
