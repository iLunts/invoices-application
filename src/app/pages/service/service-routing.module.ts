import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceListComponent } from './list/list.component';
import { ServiceCreateComponent } from './create/create.component';
import { ServiceGroupCreateComponent } from './group-create/group-create.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceListComponent,
  },
  {
    path: 'create',
    component: ServiceCreateComponent,
  },
  {
    path: 'group/create',
    component: ServiceGroupCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
