import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileListComponent } from './list/list.component';
import { ProfileCreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileListComponent
  },
  {
    path: 'create',
    component: ProfileCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
