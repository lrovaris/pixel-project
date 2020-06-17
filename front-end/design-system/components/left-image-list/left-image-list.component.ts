import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pixel-left-image-list',
  templateUrl: './left-image-list.component.html',
  styleUrls: ['./left-image-list.component.scss']
})
export class LeftImageListComponent implements OnInit {

  @Input() arrayMetadata;

  constructor() { }

  ngOnInit() {
  }

}
