import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../../../src/app/services/project.service";

@Component({
  selector: 'pixel-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit {

  @Input() pallete;

  @Output() color = new EventEmitter();

  colorsArray = [];

  projectData: any;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectData = this.projectService.GetProject();
    this.colorsArray = this.projectData.palette.colors;
  }

  emitColor(color) {
    this.color.emit(color);
  }

}
