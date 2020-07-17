import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouteService } from '../../services/route.service'

import { ModalService} from '../../services/modal.service';
import { PaletteService} from '../../services/palette.service';
import { ProjectService } from '../../services/project.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'pixel-project-management-page',
  templateUrl: './project-management-page.component.html',
  styleUrls: ['./project-management-page.component.scss']
})
export class ProjectManagementPageComponent implements OnInit {

  constructor(
    private router: RouteService,
    private modalService: ModalService,
    private projectService: ProjectService,
    private fileService: FileService,
    private cdRef: ChangeDetectorRef,
    public palletService: PaletteService
  ) {
    this.modalService.newProjectCalled$.subscribe(() => {

      this.toggleModal(true);

    });
  }

  navigate(route) {
    this.router.navigateTo(route);
  }

  ngOnInit() {

  }

  _project = this.projectService.GetProject();
  showModal = false;
  modalTitle = 'New Project';


  toggleModal(bool){

    if (bool === undefined) {
      bool = !this.showModal;
    }


    this.showModal = bool;

    this.cdRef.detectChanges();
  }





  modalOutput(event) {

    if (event.message === 'close') {
      this.toggleModal(false);
    }

  }

}
