import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
