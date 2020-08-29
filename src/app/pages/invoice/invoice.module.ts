import { NgModule } from '@angular/core';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoiceListComponent } from './list/list.component';
import { InvoiceCreateComponent } from './create/create.component';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceCreateComponent],
  imports: [SharedModule, InvoiceRoutingModule],
})
export class InvoiceModule {}
