import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContractCreateComponent } from './create/create.component';

@NgModule({
  declarations: [ContractListComponent, ContractCreateComponent],
  imports: [SharedModule, ContractRoutingModule],
})
export class ContractModule {}
