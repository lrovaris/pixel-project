import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TooltipModule} from 'ngx-bootstrap/tooltip';
import { ModalModule} from 'ngx-bootstrap/modal';
import { UploadComponent } from './pages/upload/upload.component';
import { ListComponent } from './pages/list/list.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageDisplayComponent} from './design-system/image-display/image-display.component';
import { ColorCardComponent } from './design-system/color-card/color-card.component';
import { UpdateComponent } from './pages/update/update.component';
import { MetadataComponent } from './design-system/metadata/metadata.component';
import { PaletaPageComponent } from './pages/paleta-page/paleta-page.component';
import { TilesetPageComponent } from './pages/tileset-page/tileset-page.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ListComponent,
    HeaderComponent,
    ImageDisplayComponent,
    ColorCardComponent,
    UpdateComponent,
    MetadataComponent,
    PaletaPageComponent,
    TilesetPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
