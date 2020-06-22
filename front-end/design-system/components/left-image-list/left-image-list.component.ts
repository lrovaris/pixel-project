import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-left-image-list',
  templateUrl: './left-image-list.component.html',
  styleUrls: ['./left-image-list.component.scss']
})
export class LeftImageListComponent implements OnInit {

  @Input() arrayMetadata;

  toggleImages: boolean;

  @Output() image = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.toggleImages = false;
    setTimeout(() => {
      setTimeout(() => {
        console.log(this.arrayMetadata);
        setTimeout(() => {
          this.toggleImages = true;
        }, 1);
      }, 1000);
    }, 1000);
  }

  emitImage(image) {
    this.image.emit(image);
  }

}
