import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MetadataService} from '../../services/metadata.service';
import { ImageService} from '../../services/image.service';
import { PaletteService} from '../../services/palette.service';
import { FileService} from '../../services/file.service';
import { SpriteService} from '../../services/sprite.service';
import { LeftImageListComponent } from '../../../../design-system/components/responsive-Ui-Components/left-image-list/left-image-list.component';
import {RouteService} from '../../services/route.service';

@Component({
  selector: 'pixel-create-character-page',
  templateUrl: './create-character-page.component.html',
  styleUrls: ['./create-character-page.component.scss']
})
export class CreateCharacterPageComponent implements OnInit {

@ViewChild(LeftImageListComponent, {static: false}) child: LeftImageListComponent;

  spriteTypeParam;

  lastSelection;

  metadataArray = [];

  filteredmetadataArray = [];

  selectAnimation = 1;

  selectedColorIndex: any;

  colors = [];

  showExportModal = false;
  modalTitle = 'Export';

  filePath = '';
  fileName = '';
  fileExtension = 'png';

  _activeBase;

  loadingBase = false;

  constructor(
    private metadataService: MetadataService,
    private imageService: ImageService,
    public palletService: PaletteService,
    private fileService: FileService,
    private spriteService: SpriteService,
    private cdRef: ChangeDetectorRef,
    private router: RouteService
  ) {

    this.fileService.exportCalled$.subscribe(() => {

      this.toggleModal(true);

    });

    this.spriteService.loadSpriteCalled$.subscribe(() => {

      this.renderBaseChange();

    });
  }


  ngOnInit() {
    this.spriteTypeParam = this.router.getParams();

    this.selectedColorIndex = 0;

    this.selectAnimation = 0;

    setTimeout( () => {
      this.metadataArray = this.metadataService.getMetadata();

      this.filteredmetadataArray = this.metadataArray.filter( (image) => {
        return image.metadata.spriteType.toLowerCase() === this.spriteTypeParam;
      });


      if(this.spriteService.GetBaseOfSprite() === undefined){

        this.setBase(this.metadataService.getBaseArray()[0])

        this.setActiveBase(0);

      }else{
        this.renderBaseChange()
      }
    }, 0);
  }

  pushBase(img) {
    return
  }

  setBase(image) {
      image.originalColors = image.metadata.colors;
      image.currentColors = [];

      this.spriteService.SetSprite([ image ]);

      this.renderBaseChange();
  }

  renderBaseChange() {
    this.selectAnimation = 0;

    const thisBase = this.spriteService.GetBaseOfSprite();

    this.colors = this.imagesArray()[0].metadata.colors;
    this.lastSelection = this.imagesArray()[0];

    const bases = this.metadataService.getBaseArray();




    if (bases === undefined) {
      return;
    }

    for (let index = 0; index < bases.length; index++) {
      if (thisBase._id.toString() === bases[index]._id.toString()) {
        return this.setActiveBase(index);
      }
    }
  }

  setActiveBase(newActiveBase) {

    this._activeBase = newActiveBase;

    console.log('detectar mudanças aqui?');

    this.cdRef.detectChanges();
  }

  imagesArray() {
    return this.spriteService.GetSprite();
  }

  pushImage(image) {

    const currentImage = this.imagesArray().find(img => img._id.toString() === image._id.toString());

    if (currentImage !== undefined) {
      this.lastSelection = currentImage;
      this.colors = currentImage.metadata.colors;
      return;
    }

    if (image.metadata.imgBase === true){

      this.setBase(image)

      return;
    }

    if(this.spriteService.GetBaseOfSprite()._id.toString() !== image.metadata.imgBase.toString()){

      let thisBase = this.metadataArray.find(metadataObj => {
        return metadataObj._id.toString() === image.metadata.imgBase.toString()
      })

      this.setBase(thisBase)

    }

    const imageInSameCategory = this.imagesArray().find(img => img.metadata.category === image.metadata.category);

    if (imageInSameCategory !== undefined) {

      this.spriteService.remove(imageInSameCategory);
    }

    image.originalColors = image.metadata.colors;
    image.currentColors = [];

    this.spriteService.push(image);


    this.lastSelection = this.imagesArray()[this.imagesArray().length - 1];
    this.colors = this.lastSelection.metadata.colors;
  }

  removeAcessory(image) {

    const currentImage = this.imagesArray().find(img => img._id.toString() === image._id.toString());

    if (currentImage !== undefined) {
      this.spriteService.remove(currentImage);
      return;
    }


  }

  receivColor(color, index) {

    const image = this.lastSelection;

    color.a = image.originalColors[index].a;

    const thisColor = image.currentColors.find(color => color.index === index);

    if (thisColor !== undefined) {
      thisColor.color = color;
      thisColor.index = index;
    } else {
      image.currentColors.push({
       color,
        index
      });
    }

    const changes = [];

    for (let i = 0; i < image.currentColors.length; i++) {

      changes.push({
        old_color: image.originalColors[image.currentColors[i].index],
        new_color: image.currentColors[i].color
      });

    }

    this.imageService.ChangeImageColor(image.path, changes, (base64) => {

      image.display = base64;

      this.pushImage(image);

      this.colors = [];

      for (let i = 0; i < image.originalColors.length; i++) {

        const currentColorForIndex = image.currentColors.find(currCol => {
          return currCol.index === i;
        });

        if (currentColorForIndex === undefined) {
          this.colors.push(image.originalColors[i]);
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




  // MODAL RELATED

  toggleModal(newState) {

    if(newState === undefined) {

      this.showExportModal = !this.showExportModal;

    } else {

      this.showExportModal = newState;

    }

    this.cdRef.detectChanges();
  }

  modalOutput(event) {

    if (event.message === 'close') {
      this.toggleModal(false);
    }

    if (event.message === 'export') {
      this.fileService.ExportSprite(event.exportParams);
    }

    if (event.message === 'path_dialog') {

      this.fileService.PathDialog((response) => {

        if (response.valid) {

          const stringArray = response.path.split('\\');


          let startIndex = 0;

          for (let index = 0; index < (stringArray.length -1); index++) {

            startIndex += stringArray[index].length;
            startIndex ++;
          }

          const path = response.path.substring(0, startIndex);

          this.fileName = stringArray[stringArray.length - 1];

          this.filePath = path;

          const newArray = this.fileName.split('.');

          if (newArray.length > 1) {
            if (newArray[1] === 'png'
            || newArray[1] === 'bmp'
            || newArray[1] === 'gif'
            || newArray[1] === 'jpg'
            || newArray[1] === 'pxl'
          ) {
            this.fileExtension = newArray[1];
            this.fileName = this.fileName.replace(`.${newArray[1]}`, '');
          }
        }

          this.cdRef.detectChanges();
        }
      });
    }
  }



}
