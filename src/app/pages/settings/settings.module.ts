import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsBaseComponent } from './base/base.component';
import { SettingsCompanyComponent } from './company/company.component';

@NgModule({
  declarations: [SettingsBaseComponent, SettingsCompanyComponent],
  imports: [SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
