import { NgModule } from '@angular/core';
import { ServiceRoutingModule } from './service-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ServiceListComponent
  ],
  imports: [
    SharedModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
