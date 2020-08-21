import { NgModule } from '@angular/core';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoiceListComponent } from './list/list.component';

@NgModule({
  declarations: [InvoiceListComponent],
  imports: [SharedModule, InvoiceRoutingModule],
})
export class InvoiceModule {}
