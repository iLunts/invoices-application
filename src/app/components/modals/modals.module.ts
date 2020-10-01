import { NgModule } from '@angular/core';
import { ContractorListModalComponent } from './contractor-list-modal/contractor-list-modal.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InvoiceListModalComponent } from './invoice-list-modal/invoice-list-modal.component';
import { ServiceListModalComponent } from './service-list-modal/service-list-modal.component';

@NgModule({
  declarations: [
    // ContractorListModalComponent,
    // InvoiceListModalComponent,
    // ServiceListModalComponent,
  ],
  imports: [CommonModule, IonicModule],
})
export class ModalsModule {}
