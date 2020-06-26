import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
      this.arrayMetadata = _metadata
      this.toggleImages = true;
    }
  }


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

}
