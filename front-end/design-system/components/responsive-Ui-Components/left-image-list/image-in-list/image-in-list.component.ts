import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pixel-image-in-list',
  templateUrl: './image-in-list.component.html',
  styleUrls: ['./image-in-list.component.scss']
})
export class ImageInListComponent implements OnInit {

  @Input() imgPath;
  @Input() height;
  @Input() width;
  

  constructor() { }

  ngOnInit() {
  }

}
