import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IpcService } from './ipc.service'

import { SpriteService } from './sprite.service'
import { ProjectService } from './project.service'



@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private ipc: IpcService,
    private spriteService: SpriteService,
    private projectService: ProjectService
  ) {

    this.ipc.on('save-sprite-command', (e, a) => {

      this.SaveSprite(this.projectService.GetProjectName(), this.spriteService.GetSprite(), (response) =>{

        if (response.valid) {
          this.projectService.AddSprite(response.path, this.spriteService.GetSprite())

          this.SaveProject(this.projectService.GetProject(), (response) =>{

          })
        }

      })
    })


    this.ipc.on('load-sprite-command', (e, a) => {

      this.spriteService.LoadSprite(a);

    })

    this.ipc.on('export-sprite-command', (e, a) => {

      this.exportCallSource.next();

    })

    this.ipc.on('save-project-command', (e, a) => {

      this.SaveProject(this.projectService.GetProject(), (response) =>{

        alert(response.message)

      })
    })

    this.ipc.on('load-project-command', (e,a) => {

      this.projectService.LoadProject(a.project, a.sprites);

    });

    this.ipc.on('get-recent-files-command', (e,a) => {

      this.recentFiles = a.files

    });


  }

  recentFiles = [];

  private exportCallSource = new Subject<any>();

  exportCalled$ = this.exportCallSource.asObservable();


  public SaveSprite(projectName: string, imagesArray: any, callback: any) {

    if(projectName === undefined){
      return
    }

    if(imagesArray === undefined){
      return
    }

    this.ipc.once('save-sprite-reply', (e: any, a: any) => {

      callback(a);

    });

    this.ipc.send('save-sprite', {
      projectName: projectName,
      data: imagesArray
    });

  }

  public LoadProject(){
    this.ipc.send('load-project', {});
  }

  public SaveProject(projectInfo: any, callback: any) {


    if(projectInfo === undefined){
      return
    }

    this.ipc.once('save-project-reply', (e: any, a: any) => {

      callback(a);

    });

    this.ipc.send('save-project', projectInfo);
  }

  public ExportSprite(params) {

    const sprite = this.spriteService.GetSprite()

    if(sprite === undefined){
      return
    }

    this.ipc.once('export-sprite-reply', (e: any, a: any) => {

    });

    this.ipc.send('export-sprite', {
      sprite: sprite,
      params: params
    });
  }

  public PathDialog(callback: any) {

    this.ipc.once('save-dialog-reply', (e: any, a: any) => {

      callback(a)

    });

    this.ipc.send('save-dialog');

  }

  public loadRecentFiles() {
    this.ipc.send('get-recent-files');
  }

  public getRecentFiles() {
    return this.recentFiles;
  }



}
