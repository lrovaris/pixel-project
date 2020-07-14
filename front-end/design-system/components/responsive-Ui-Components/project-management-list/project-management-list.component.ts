import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-project-management-list',
  templateUrl: './project-management-list.component.html',
  styleUrls: ['./project-management-list.component.scss']
})
export class ProjectManagementListComponent implements OnInit {

  @Output() routeDestination = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  emitRouteDestination(route) {
    this.routeDestination.emit(route);
  }

}
