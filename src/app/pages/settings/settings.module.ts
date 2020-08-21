import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsListComponent } from './list/list.component';

@NgModule({
  declarations: [SettingsListComponent],
  imports: [SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
