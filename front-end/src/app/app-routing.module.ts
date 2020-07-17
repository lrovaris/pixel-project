import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { CreateScenarioPageComponent } from './pages/create-scenario-page/create-scenario-page.component';
import { CreateUIPageComponent } from './pages/create-ui-page/create-ui-page.component';
import { CreateEnemyPageComponent } from './pages/create-enemy-page/create-enemy-page.component';
import { CreateFXPageComponent } from './pages/create-fx-page/create-fx-page.component';
import { ProjectManagementPageComponent } from './pages/project-management-page/project-management-page.component';
import { CreateCharacterPageComponent } from './pages/create-character-page/create-character-page.component';
import { LoadingPageComponent} from './pages/loading-page/loading-page.component';
import { SpriteTypeSelectPageComponent} from './pages/sprite-type-select-page/sprite-type-select-page.component';

const routes: Routes = [
  { path: '', component: LoadingPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'scenario', component: CreateScenarioPageComponent },
  { path: 'character', component: CreateCharacterPageComponent },
  { path: 'ui', component: CreateUIPageComponent },
  { path: 'enemy', component: CreateEnemyPageComponent },
  { path: 'fx', component: CreateFXPageComponent },
  { path: 'management', component: ProjectManagementPageComponent},
  { path: 'spriteSelect', component: SpriteTypeSelectPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
