import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceListComponent } from './list/list.component';
import { ServiceCreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceListComponent,
  },
  {
    path: 'create',
    component: ServiceCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
