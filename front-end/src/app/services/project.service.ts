import { Injectable } from '@angular/core';

import { RouteService } from './route.service'

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private router: RouteService) { }

  Project: any = {};
  Sprites: any = [];

  private setProjectCallSource = new Subject<any>();

  setProjectCalled$ = this.setProjectCallSource.asObservable();

  public LoadProject(newProject) {

    this.SetProject(newProject)

    console.log(this.Project);


    this.router.navigateTo('management')

  }

  public NewProject(projectInfo) {

    this.SetProject(projectInfo)

    this.router.navigateTo('management');

  }

  public SetProject(newProject) {

    this.Project = newProject;

    this.setProjectCallSource.next()

  }

  public AddSprite(path){

    if (this.Project.sprites === undefined){

      this.Project.sprites = [path]

    }else{

      let sprite_exists = this.Project.sprites.find((_path) => {
        if(_path.toString() === path.toString()){
          return true;
        }
      })

      if(sprite_exists === undefined){
        this.Project.sprites.push(path)
      }
    }

    console.log(this.Project.sprites);

  }

  public GetProject() {

    return this.Project;
  }

  public GetProjectName() {

    if(this.Project.name === undefined){
      return ""
    }else{

      return this.Project.name;
    }

  }


}
