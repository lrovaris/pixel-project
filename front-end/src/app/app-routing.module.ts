import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ProjectManagementPageComponent } from './pages/project-management-page/project-management-page.component';
import { CreateCharacterPageComponent } from './pages/create-character-page/create-character-page.component';
import { LoadingPageComponent} from './pages/loading-page/loading-page.component';
import { SpriteTypeSelectPageComponent} from './pages/sprite-type-select-page/sprite-type-select-page.component';
import { TileSetPageComponent } from './pages/tile-set-page/tile-set-page.component';



const routes: Routes = [
  { path: '', component: LoadingPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'character', component: CreateCharacterPageComponent },
  { path: 'enemy', component: CreateCharacterPageComponent },
  { path: 'management', component: ProjectManagementPageComponent},
  { path: 'spriteselect', component: SpriteTypeSelectPageComponent},
  { path: 'scenario', component: TileSetPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
