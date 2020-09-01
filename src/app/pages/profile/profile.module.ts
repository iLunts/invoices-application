import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileCreateComponent } from './create/create.component';
import { ProfileListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProfileCreateComponent, ProfileListComponent],
  imports: [SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
