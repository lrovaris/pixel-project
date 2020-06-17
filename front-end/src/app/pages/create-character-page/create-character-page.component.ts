import { Component, OnInit } from '@angular/core';
import {MetadataService} from '../../services/metadata.service';

@Component({
  selector: 'pixel-create-character-page',
  templateUrl: './create-character-page.component.html',
  styleUrls: ['./create-character-page.component.scss']
})
export class CreateCharacterPageComponent implements OnInit {

  imagesArray = [];


  selectAnimation: any;

  constructor(private metadataService: MetadataService) { }

  ngOnInit() {
    setTimeout( () => {
      setTimeout( () => {
        this.imagesArray = this.metadataService.getMetadata();
        console.log(this.imagesArray);
        console.log('a');
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

}