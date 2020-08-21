import { NgModule } from '@angular/core';

import { ContractorRoutingModule } from './contractor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContractorListComponent } from './list/list.component';

@NgModule({
  declarations: [ContractorListComponent],
  imports: [SharedModule, ContractorRoutingModule],
})
export class ContractorModule {}
