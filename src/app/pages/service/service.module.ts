import { NgModule } from '@angular/core';
import { ServiceRoutingModule } from './service-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceListComponent } from './list/list.component';
import { ServiceCreateComponent } from './create/create.component';

@NgModule({
  declarations: [ServiceListComponent, ServiceCreateComponent],
  imports: [SharedModule, ServiceRoutingModule],
})
export class ServiceModule {}
