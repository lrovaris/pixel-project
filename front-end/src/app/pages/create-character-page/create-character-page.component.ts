import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pixel-create-character-page',
  templateUrl: './create-character-page.component.html',
  styleUrls: ['./create-character-page.component.scss']
})
export class CreateCharacterPageComponent implements OnInit {

  imagesArray = [/*
    {
      path: 'https://cdn.discordapp.com/attachments/280427487161221121/722471015937999232/hood.png',
      frames: 10,
      width: 16,
      height: 16,
      spriteWidth: 160,
      z: 2,
      animation: [
        {
          name: 'iddle',
          frames: 4
        },
        {
          name: 'run',
          frames: 6
        }
      ],
      id: 'idunicocapuz',
      name: 'boneco'
    },*/
    {
      path: 'https://cdn.discordapp.com/attachments/280427487161221121/722471032237064202/hair.png',
      frames: 10,
      width: 16,
      height: 16,
      spriteWidth: 160,
      z: 2,
      animation: [
        {
          name: 'iddle',
          frames: 4
        },
        {
          name: 'run',
          frames: 6
        }
      ],
      id: 'idunicocabelo',
      name: 'boneco'
    },
    {
      path: 'https://cdn.discordapp.com/attachments/280427487161221121/722471034955104427/cloak.png',
      frames: 10,
      width: 16,
      height: 16,
      spriteWidth: 160,
      z: 2,
      animation: [
        {
          name: 'iddle',
          frames: 4
        },
        {
          name: 'run',
          frames: 6
        }
      ],
      id: 'idunicocapa',
      name: 'boneco'
    },
    {
      path: 'https://cdn.discordapp.com/attachments/280427487161221121/722471045612699699/leg.png',
      frames: 10,
      width: 16,
      height: 16,
      spriteWidth: 160,
      z: 2,
      animation: [
        {
          name: 'iddle',
          frames: 4
        },
        {
          name: 'run',
          frames: 6
        }
      ],
      id: 'idunicoperna',
      name: 'boneco'
    },
    {
      path: 'https://cdn.discordapp.com/attachments/280427487161221121/722471037656367204/Char_Base.png',
      frames: 10,
      width: 16,
      height: 16,
      spriteWidth: 160,
      z: 1,
      animation: [
        {
          name: 'iddle',
          frames: 4
        },
        {
          name: 'run',
          frames: 6
        }
      ],
      id: 'idunicodoboneco',
      name: 'boneco'
    },
  ];

  selectAnimation: any;

  constructor() { }

  ngOnInit() {
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
