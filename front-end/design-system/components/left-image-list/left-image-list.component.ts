import {Component, EventEmitter, Input, OnInit, Output, AfterViewChecked} from '@angular/core';

@Component({
  selector: 'pixel-left-image-list',
  templateUrl: './left-image-list.component.html',
  styleUrls: ['./left-image-list.component.scss']
})
export class LeftImageListComponent implements OnInit {

  @Input() set metadata(_metadata){

    if(_metadata === undefined){
      return
    }

    if(_metadata.length > 0){
      this.arrayMetadata = _metadata;
      this.toggleImages = true;
      for (let i = 0; i < this.arrayMetadata.length; i++) {
        if (this.arrayMetadata[i].metadata.imgBase === true) {
          this.arrayBases.push(this.arrayMetadata[i]);

        }
      }

    }
  }

  arrayBases = [];
  arrayCategorias = [];

  arrayMetadata = [];
  toggleImages: boolean;

  @Output() image = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.toggleImages = false;
  }

  emitImage(image) {
    this.image.emit(image);
  }

  changeCategoryArray(index) {
    this.arrayCategorias = this.arrayBases[index].metadata.category;

    this.arrayCategorias = this.arrayCategorias.map((category) => {

      const objsOfCategory = this.arrayMetadata.filter( (image) => {
        if (image.metadata.category === undefined) {
          return false;
        }
        return image.metadata.category.toString() === category.toString();
      });

      return {
        category,
        objsOfCategory
      };

    });

  }


}
