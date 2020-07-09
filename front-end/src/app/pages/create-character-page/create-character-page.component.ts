import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';

import { MetadataService} from '../../services/metadata.service';
import { ImageService} from '../../services/image.service';
import { PaletteService} from '../../services/palette.service';
import { FileService} from '../../services/file.service';
import { SpriteService} from '../../services/sprite.service';
import {LeftImageListComponent} from "../../../../design-system/components/responsive-Ui-Components/left-image-list/left-image-list.component";

@Component({
  selector: 'pixel-create-character-page',
  templateUrl: './create-character-page.component.html',
  styleUrls: ['./create-character-page.component.scss']
})
export class CreateCharacterPageComponent implements OnInit {

@ViewChild(LeftImageListComponent, {static: false}) child: LeftImageListComponent;

  lastSelection;

  metadataArray = [];

  selectAnimation = 1;

  selectedColorIndex: any;

  colors = [];

  showExportModal = false;
  modalTitle = 'Export';

  filePath = '';
  fileName = '';
  fileExtension = 'png';

  arrayBases = [];
  activeBase;

  constructor(
    private metadataService: MetadataService,
    private imageService: ImageService,
    public palletService: PaletteService,
    private fileService: FileService,
    private spriteService: SpriteService,
    private cdRef: ChangeDetectorRef
  ) {

    this.fileService.exportCalled$.subscribe(() => {

      this.toggleModal(true);

    });
  }


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
          });

        });

        for (let i = 0; i < this.metadataArray.length; i++) {
          if (this.metadataArray[i].metadata.imgBase === true) {
            this.arrayBases.push(this.metadataArray[i]);

          }
        }

      }, 1000);
    }, 1000);

    this.selectAnimation = 0;
  }

  baseOfSprite() {
    const base = this.spriteService.GetBaseOfSprite();
    for (let i = 0; i < this.arrayBases.length; i++) {
      if (base !== undefined) {
        if (base.metadata.name === this.arrayBases[i].metadata.name) {
          return i;
        }
      }
    }

  }

  imagesArray() {
    return this.spriteService.GetSprite();
  }

  pushBase(img) {

    if (img === undefined) {
      return;
    }

    this.setBase(img);

  }


  changeBase(index) {
    this.baseOfSprite();
  }

  pushImage(image) {
    const currentImage = this.imagesArray().find(img => img._id.toString() === image._id.toString());

    if (currentImage !== undefined) {
      this.lastSelection = currentImage;
      this.colors = currentImage.metadata.colors;
      return;
    }

    const imageInSameCategory = this.imagesArray().find(img => img.metadata.category === image.metadata.category);

    if (imageInSameCategory !== undefined) {

      this.spriteService.remove(imageInSameCategory);
    }

    image.originalColors = image.metadata.colors;
    image.currentColors = [];

    this.spriteService.push(image);


    this.lastSelection = this.imagesArray()[this.imagesArray().length-1]
    this.colors = this.lastSelection.metadata.colors;
  }

  removeAcessory(image){

    const currentImage = this.imagesArray().find(img => img._id.toString() === image._id.toString())

    if (currentImage !== undefined){
      this.spriteService.remove(currentImage);
      return;
    }


  }

  setBase(image) {

      image.originalColors = image.metadata.colors;
      image.currentColors = [];

      this.spriteService.SetSprite([ image ]);

      this.colors = this.imagesArray()[0].metadata.colors;
      this.lastSelection = this.imagesArray()[0];


  }

  receivColor(color, index) {

    const image = this.lastSelection;

    color.a = image.originalColors[index].a;

    const thisColor = image.currentColors.find(color => color.index === index);

    if(thisColor !== undefined){
      thisColor.color = color
      thisColor.index = index
    } else {
      image.currentColors.push({
       color,
        index
      });
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

        const currentColorForIndex = image.currentColors.find(currCol => {
          return currCol.index === i;
        });

        if (currentColorForIndex === undefined){
          this.colors.push(image.originalColors[i])
        } else {
          this.colors.push({
            r: currentColorForIndex.color.r,
            g: currentColorForIndex.color.g,
            b: currentColorForIndex.color.b,
            a: currentColorForIndex.color.a,
            name: image.originalColors[i].name
          });
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

  toggleModal(newState) {

    if(newState === undefined) {

      this.showExportModal = !this.showExportModal;

    } else {

      this.showExportModal = newState;

    }

    this.cdRef.detectChanges();
  }

  modalOutput(event) {

    if (event.message === 'close'){
      this.toggleModal(false);
    }

    if(event.message === 'export'){
      this.fileService.ExportSprite(event.exportParams)
    }

    if(event.message === 'path_dialog'){

      this.fileService.PathDialog((response) => {

        if (response.valid) {

          let string_array = response.path.split('\\');


          let start_index = 0;

          for (let index = 0; index < (string_array.length -1); index++) {

            start_index += string_array[index].length
            start_index ++;
          }

          let path = response.path.substring(0, start_index);

          this.fileName = string_array[string_array.length - 1];

          this.filePath = path

          let newArray = this.fileName.split('.');

          if(newArray.length > 1){
            if(newArray[1] === 'png'
            || newArray[1] === 'bmp'
            || newArray[1] === 'gif'
            || newArray[1] === 'jpg'
            || newArray[1] === 'pxl'
          ){
            this.fileExtension = newArray[1];
            this.fileName = this.fileName.replace(`.${newArray[1]}`, '');
          }
        }

          this.cdRef.detectChanges();
        }
      })
    }
  }

}
