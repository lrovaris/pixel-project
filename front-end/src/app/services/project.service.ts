import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  Project = {};

  public LoadProject(newProject) {

    this.SetProject(newProject)

  }

  public NewProject(projectInfo) {

    this.SetProject(projectInfo)

  }

  public SetProject(newProject) {

    this.Project = newProject;

  }

  public GetProject() {
    
    return this.Project;
  }

}
