import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleButtonComponent } from './components/still-not-categorized/simple-button/simple-button.component';
import { BottonLeftMenuComponent } from './components/responsive-Ui-Components/color-part-selector-menu/botton-left-menu.component';
import { LeftImageListComponent } from './components/responsive-Ui-Components/left-image-list/left-image-list.component';
import { ImageDisplayComponent } from './components/display-animation-related/image-display/image-display.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ImageInListComponent } from './components/responsive-Ui-Components/left-image-list/image-in-list/image-in-list.component';
import { RightMenuComponent } from './components/responsive-Ui-Components/animation-menu/right-menu.component';
import { HeaderComponent } from './components/still-not-categorized/header/header.component';
import { ColorListComponent } from './components/responsive-Ui-Components/color-list/color-list.component';
import { ColorCardComponent } from './components/cards/color-card/color-card.component';
import { CardAnimationComponent } from './components/cards/card-animation/card-animation.component';
import { AnimatorComponent } from './components/display-animation-related/animator/animator.component';
import { ModalComponent } from './components/still-not-categorized/modal/modal.component';
import { ExportModalComponent } from './components/still-not-categorized/export-modal/export-modal.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BoxUnderDisplayComponent } from './components/responsive-Ui-Components/box-under-display/box-under-display.component';
import { DisplayBoxComponent } from './components/responsive-Ui-Components/display-box/display-box.component';
import { ProjectManagementListComponent } from './components/responsive-Ui-Components/project-management-list/project-management-list.component';
import { NewProjectModalComponent } from './components/still-not-categorized/new-project-modal/new-project-modal.component';
import { SpriteTypeSelectListComponent } from './components/responsive-Ui-Components/sprite-type-select-list/sprite-type-select-list.component';

@NgModule({
  declarations: [
    SimpleButtonComponent,
    BottonLeftMenuComponent,
    LeftImageListComponent,
    ImageDisplayComponent,
    ImageInListComponent,
    RightMenuComponent,
    HeaderComponent,
    ColorListComponent,
    ColorCardComponent,
    CardAnimationComponent,
    AnimatorComponent,
    ModalComponent,
    ExportModalComponent,
    BoxUnderDisplayComponent,
    DisplayBoxComponent,
    ProjectManagementListComponent,
    NewProjectModalComponent,
    SpriteTypeSelectListComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule
  ],
  exports: [
    SimpleButtonComponent,
    BottonLeftMenuComponent,
    LeftImageListComponent,
    ImageDisplayComponent,
    RightMenuComponent,
    ColorListComponent,
    AnimatorComponent,
    ModalComponent,
    ExportModalComponent,
    BoxUnderDisplayComponent,
    DisplayBoxComponent,
    ProjectManagementListComponent,
    NewProjectModalComponent,
    SpriteTypeSelectListComponent
  ]
})
export class DesignSystemModule { }
