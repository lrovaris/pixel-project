import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesignSystemModule } from '../../design-system/design-system.module';
import { LoadingPageComponent } from './pages/loading-page/loading-page.component';
import { CreateCharacterPageComponent } from './pages/create-character-page/create-character-page.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectManagementPageComponent } from './pages/project-management-page/project-management-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { CreateScenarioPageComponent } from './pages/create-scenario-page/create-scenario-page.component';
import { CreateUIPageComponent } from './pages/create-ui-page/create-ui-page.component';
import { CreateFXPageComponent } from './pages/create-fx-page/create-fx-page.component';
import { CreateEnemyPageComponent } from './pages/create-enemy-page/create-enemy-page.component';
import { SpriteTypeSelectPageComponent } from './pages/sprite-type-select-page/sprite-type-select-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingPageComponent,
    CreateCharacterPageComponent,
    HeaderComponent,
    HomePageComponent,
    ProjectManagementPageComponent,
    ContactPageComponent,
    CreateScenarioPageComponent,
    CreateUIPageComponent,
    CreateFXPageComponent,
    CreateEnemyPageComponent,
    SpriteTypeSelectPageComponent,
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
