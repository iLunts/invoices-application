import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractorListComponent } from './list/list.component';
import { ContractorCreateComponent } from './create/create.component';
import { ContractorInfoComponent } from './info/info.component';
import { ContractorDocumentsComponent } from './documents/documents.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorListComponent,
  },
  {
    path: 'create',
    component: ContractorCreateComponent,
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        component: ContractorInfoComponent,
      },
      {
        path: 'documents',
        component: ContractorDocumentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractorRoutingModule {}
