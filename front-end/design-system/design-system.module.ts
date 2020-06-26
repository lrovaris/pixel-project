import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleButtonComponent } from './components/simple-button/simple-button.component';
import { BottonLeftMenuComponent } from './components/botton-left-menu/botton-left-menu.component';
import { LeftImageListComponent } from './components/left-image-list/left-image-list.component';
import { ImageDisplayComponent } from './components/image-display/image-display.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ImageInListComponent } from './components/left-image-list/image-in-list/image-in-list.component';
import { RightMenuComponent } from './components/right-menu/right-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorCardComponent } from './components/color-card/color-card.component';
import { CardAnimationComponent } from './components/card-animation/card-animation.component';
import { AnimatorComponent } from './components/animator/animator.component';

@NgModule({
  declarations: [SimpleButtonComponent, BottonLeftMenuComponent, LeftImageListComponent, ImageDisplayComponent, ImageInListComponent, RightMenuComponent, HeaderComponent, ColorListComponent, ColorCardComponent, CardAnimationComponent, AnimatorComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    SimpleButtonComponent,
    BottonLeftMenuComponent,
    LeftImageListComponent,
    ImageDisplayComponent,
    RightMenuComponent,
    ColorListComponent,
    AnimatorComponent
  ]
})
export class DesignSystemModule { }
