import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActsCreateComponent } from './create/create.component';
import { ActsListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ActsListComponent,
  },
  {
    path: 'create',
    component: ActsCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActsRoutingModule {}
