import { NgModule } from '@angular/core';

import { ContractorRoutingModule } from './contractor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContractorListComponent } from './list/list.component';
import { ContractorCreateComponent } from './create/create.component';

@NgModule({
  declarations: [ContractorListComponent, ContractorCreateComponent],
  imports: [SharedModule, ContractorRoutingModule],
})
export class ContractorModule {}
