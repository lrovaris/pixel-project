import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesignSystemModule } from '../../design-system/design-system.module';
import { LoadingPageComponent } from './pages/loading-page/loading-page.component';
import { CreateCharacterPageComponent } from './pages/create-character-page/create-character-page.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingPageComponent,
    CreateCharacterPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DesignSystemModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
