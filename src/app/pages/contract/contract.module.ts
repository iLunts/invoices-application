import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractListComponent } from './list/list.component';

@NgModule({
  declarations: [ContractListComponent],
  imports: [CommonModule, ContractRoutingModule],
})
export class ContractModule {}
