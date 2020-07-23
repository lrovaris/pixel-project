import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-acessory-modal',
  templateUrl: './acessory-modal.component.html',
  styleUrls: ['./acessory-modal.component.scss']
})
export class AcessoryModalComponent implements OnInit {

  @Output() modalOutput = new EventEmitter();

  @Output() image = new EventEmitter();

  @Input() set spriteList(sprites){
    console.log(sprites);

    this.originalSpriteList = sprites

    this.filterSprites();
  }

  originalSpriteList = [];
  filteredSpriteList = [];

  filterString = "";

  filterSprites(){

    this.filteredSpriteList = this.originalSpriteList.filter(sprite => {
      return sprite.metadata.name.toLowerCase().includes(this.filterString.toLowerCase())
    })

  }

  constructor() { }

  ngOnInit() {
    console.log(this.spriteList);
  }

  cancelButton() {
    this.modalOutput.emit({ message: 'close'});
  }

  emitImage(image) {
   this.image.emit(image);
   this.modalOutput.emit({message: 'close'});
  }

}
