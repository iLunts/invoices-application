import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsBaseComponent } from './base/base.component';
import { SettingsCompanyComponent } from './company/company.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsBaseComponent,
  },
  {
    path: 'company',
    component: SettingsCompanyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
