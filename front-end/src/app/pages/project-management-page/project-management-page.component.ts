import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouteService } from '../../services/route.service'

import { ModalService} from '../../services/modal.service';
import { PaletteService} from '../../services/palette.service';
import { ProjectService } from '../../services/project.service';
import { FileService } from '../../services/file.service';
import { SpriteService } from '../../services/sprite.service';

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
    private spriteService: SpriteService,
    private cdRef: ChangeDetectorRef,
    public palletService: PaletteService
  ) {
    this.modalService.newProjectCalled$.subscribe(() => {

      this.toggleModal(true);

    });

    this.projectService.setProjectCalled$.subscribe(() => {

      this._project = this.projectService.GetProject();

      console.log('set project called');


      this.cdRef.detectChanges();

    })
  }

  navigate(sprite) {

    if(sprite === 'spriteSelect'){

      return this.router.navigateTo(sprite.toLowerCase())

    }

    this.spriteService.LoadSprite(sprite)
  }

  ngOnInit() {

    this._project = this.projectService.GetProject();

  }

  _project = this.projectService.GetProject();
  showModal = false;
  modalTitle = 'New Project';


  toggleModal(bool){

    if (bool === undefined) {
      bool = !this.showModal;
    }

    this.showModal = bool;

    console.log('toggleModal called');


    this.cdRef.detectChanges();
  }

  modalOutput(event) {

    if (event.message === 'close') {
      this.toggleModal(false);
    }

  }

}
