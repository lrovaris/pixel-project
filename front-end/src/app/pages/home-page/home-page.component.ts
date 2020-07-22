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

    showModal = false;
    modalTitle = 'New Project';
    recentFiles = []

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
      this.toggleModal(true);
    }

    loadProject(){

      this.fileService.LoadProject()

    }


    navigateContact() { this.router.navigateTo('contact'); }

    ngOnInit() {
      this.recentFiles = this.fileService.getRecentFiles()
      console.log(this.recentFiles);


    }

  }
