import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pixel-create-character-page',
  templateUrl: './create-character-page.component.html',
  styleUrls: ['./create-character-page.component.scss']
})
export class CreateCharacterPageComponent implements OnInit {

  imagesArray = [
    {
      path: 'http://161.35.10.72:3000/files/1592225226982-242047489Char%20Base.png',
      frames: 3,
      width: 16,
      height: 16,
      spriteWidth: 48,
      name: 'boneco'
    },
    {
      path: 'http://161.35.10.72:3000/files/1592225234791-816771456cloak.png',
      frames: 3,
      width: 16,
      height: 16,
      spriteWidth: 48,
      name: 'capa'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
