import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleButtonComponent } from './components/simple-button/simple-button.component';
import { BottonLeftMenuComponent } from './components/botton-left-menu/botton-left-menu.component';
import { LeftImageListComponent } from './components/left-image-list/left-image-list.component';
import { ImageDisplayComponent } from './components/image-display/image-display.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ImageInListComponent } from './components/left-image-list/image-in-list/image-in-list.component';

@NgModule({
  declarations: [SimpleButtonComponent, BottonLeftMenuComponent, LeftImageListComponent, ImageDisplayComponent, ImageInListComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    SimpleButtonComponent,
    BottonLeftMenuComponent,
    LeftImageListComponent,
    ImageDisplayComponent
  ]
})
export class DesignSystemModule { }
