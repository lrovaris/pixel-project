import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { RouteService } from '../../services/route.service'
import { ModalService} from '../../services/modal.service';
import { PaletteService} from '../../services/palette.service';
import { ProjectService} from '../../services/project.service';
import { FileService} from '../../services/file.service';




@Component({
  selector: 'pixel-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  showModal = false;
  modalTitle = 'New Project';
  recentFiles = [];

  currentState1 = 'initial';
  currentState2 = 'initial';
  currentState3 = 'initial';
  currentStateLoad = [];

  constructor(
    private router: RouteService,
    private modalService: ModalService,
    private cdRef: ChangeDetectorRef,
    public palletService: PaletteService,
    private projectService: ProjectService,
    private fileService: FileService) {

      this.modalService.newProjectCalled$.subscribe(() => {

        this.toggleModal(true);

      });
    }

    ngOnInit() {
      this.recentFiles = this.fileService.getRecentFiles();
      console.log(this.recentFiles);


    }



    recentProjects(){

      const recentProjects = this.recentFiles.filter(file => file.type === "project");

      for (let i = 0; i < recentProjects.length; i ++) {
        this.currentStateLoad.push('initial');
      }
      return recentProjects;
    }

    toggleModal(bool){

      if(bool === undefined){
        bool = !this.showModal
      }


      this.showModal = bool

      this.cdRef.detectChanges();
    }

    modalOutput(event) {

      if (event.message === 'new-project'){

        this.fileService.SaveProject(event.projectInfo, (response) => {
          this.projectService.NewProject(event.projectInfo)
        })

      }

      if (event.message === 'close'){
        this.toggleModal(false);
      }

    }

    newProject(){
      this.currentState1 = 'final';
      setTimeout(() =>{
       this.currentState1 = 'initial';
       setTimeout(()=> {
         this.toggleModal(true);
       }, 50);
      }, 250);

    }

    loadProject() {

      this.currentState2 = 'final';
      setTimeout(() => {
        this.currentState2 = 'initial';
        setTimeout(() => {
          this.fileService.LoadProject();
        }, 50);
      }, 250);

    }

    loadRecentProject(path, index) {

      this.currentStateLoad[index] = 'final';
      setTimeout(() => {
        this.currentStateLoad[index] = 'initial';
        setTimeout(() => {
          this.fileService.LoadRecentProject(path);
        }, 50);
      }, 250);

    }


    navigateContact() {

      this.currentState3 = 'final';
      setTimeout(() => {
        this.currentState3 = 'initial';
        setTimeout(() => {
          this.router.navigateTo('contact');
        }, 50);
      }, 250);



  }





  }
