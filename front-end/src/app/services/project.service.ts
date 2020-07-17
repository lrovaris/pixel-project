import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  Project = {};

  private setProjectCallSource = new Subject<any>();

  setProjectCalled$ = this.setProjectCallSource.asObservable();

  public LoadProject(newProject) {

    this.SetProject(newProject)

  }

  public NewProject(projectInfo) {

    this.SetProject(projectInfo)

  }

  public SetProject(newProject) {

    this.Project = newProject;

    this.setProjectCallSource.next()

  }

  public GetProject() {

    return this.Project;
  }

}
