import { NgModule } from '@angular/core';
import { ActsRoutingModule } from './acts-routing.module';
import { ActsListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActsCreateComponent } from './create/create.component';


@NgModule({
  declarations: [ActsListComponent, ActsCreateComponent],
  imports: [SharedModule, ActsRoutingModule],
})
export class ActsModule {}
