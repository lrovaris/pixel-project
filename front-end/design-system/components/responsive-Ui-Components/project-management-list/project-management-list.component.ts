import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from '../../../../src/app/services/project.service';

@Component({
  selector: 'pixel-project-management-list',
  templateUrl: './project-management-list.component.html',
  styleUrls: ['./project-management-list.component.scss']
})
export class ProjectManagementListComponent implements OnInit {

  @Output() routeDestination = new EventEmitter();

  spriteList = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.spriteList = this.projectService.GetSprites();
  }

  emitRouteDestination(sprite) {

    this.routeDestination.emit(sprite);

  }

}
