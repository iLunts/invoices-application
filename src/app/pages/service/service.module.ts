import { NgModule } from '@angular/core';
import { ServiceRoutingModule } from './service-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceListComponent } from './list/list.component';
import { ServiceCreateComponent } from './create/create.component';
import { ServiceTabGroupComponent } from './tabs/group/group.component';
import { ServiceTabServiceComponent } from './tabs/service/service.component';
import { ServiceGroupCreateComponent } from './group-create/group-create.component';

@NgModule({
  declarations: [
    ServiceListComponent,
    ServiceCreateComponent,
    ServiceTabGroupComponent,
    ServiceTabServiceComponent,
    ServiceGroupCreateComponent,
  ],
  imports: [SharedModule, ServiceRoutingModule],
})
export class ServiceModule {}
