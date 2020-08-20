import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { UploadComponent } from './pages/upload/upload.component';
import { UpdateComponent } from './pages/update/update.component';
import { PaletaPageComponent } from './pages/paleta-page/paleta-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'list', component: ListComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'edit', component: UpdateComponent },
  { path: 'paleta', component: PaletaPageComponent },
  { path: 'tileset', component: UploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
