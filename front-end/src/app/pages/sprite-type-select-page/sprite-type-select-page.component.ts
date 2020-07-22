import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouteService} from '../../services/route.service';
import {ModalService} from '../../services/modal.service';
import {ProjectService} from '../../services/project.service';
import {PaletteService} from '../../services/palette.service';
import {SpriteService} from '../../services/sprite.service';

@Component({
  selector: 'pixel-sprite-type-select-page',
  templateUrl: './sprite-type-select-page.component.html',
  styleUrls: ['./sprite-type-select-page.component.scss']
})
export class SpriteTypeSelectPageComponent implements OnInit {


  constructor(
    private router: RouteService,
    private modalService: ModalService,
    private projectService: ProjectService,
    private spriteService: SpriteService,
    private cdRef: ChangeDetectorRef,
    public palletService: PaletteService
  ) {
    this.modalService.newProjectCalled$.subscribe(() => {

      this.toggleModal(true);

    });
  }

  _project = this.projectService.GetProject();
  showModal = false;

  modalTitle = 'New Project';

  ngOnInit() {

  }


  navigate(route) {

    this.spriteService.ResetSprite()

    this.router.navigateTo("character", route);
  }

  toggleModal(bool) {

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
