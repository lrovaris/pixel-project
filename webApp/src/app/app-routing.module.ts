import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { UploadComponent } from './pages/upload/upload.component';
import { UpdateComponent } from './pages/update/update.component';


const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'edit', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
