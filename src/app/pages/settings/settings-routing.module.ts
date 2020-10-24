import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsBaseComponent } from './base/base.component';
import { SettingsCompanyComponent } from './company/company.component';
import { SettingsCompanyCreateComponent } from './company/create/create.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsBaseComponent,
  },
  {
    path: 'company',
    children: [
      {
        path: '',
        component: SettingsCompanyComponent,
      },
      {
        path: 'create',
        component: SettingsCompanyCreateComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
