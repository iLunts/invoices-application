import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractorListComponent } from './list/list.component';
import { ContractorCreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorListComponent,
  },
  {
    path: 'create',
    component: ContractorCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractorRoutingModule {}
