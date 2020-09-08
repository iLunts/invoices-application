import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { ContractorItemComponent } from '../components/ui/contractor-item/contractor-item.component';
import { InvoiceServiceItemComponent } from '../components/ui/invoice-service-item/invoice-service-item.component';
import { ContractorPanelComponent } from '../components/ui/contractor-panel/contractor-panel.component';
import { InvoicePanelComponent } from '../components/ui/invoice-panel/invoice-panel.component';
import { EmptyComponent } from '../components/ui/empty/empty.component';
import { ContractorListModalComponent } from '../components/modals/contractor-list-modal/contractor-list-modal.component';
import { ServiceListModalComponent } from '../components/modals/service-list-modal/service-list-modal.component';
import { ServicePanelComponent } from '../components/ui/service-panel/service-panel.component';

@NgModule({
  declarations: [
    ContractorItemComponent,
    ContractorPanelComponent,
    InvoiceServiceItemComponent,
    InvoicePanelComponent,
    ServicePanelComponent,
    EmptyComponent,
    ContractorListModalComponent,
    ServiceListModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ContractorItemComponent,
    ContractorPanelComponent,
    InvoiceServiceItemComponent,
    InvoicePanelComponent,
    ServicePanelComponent,
    EmptyComponent,
  ],
  entryComponents: [ContractorListModalComponent, ServiceListModalComponent],
})
export class SharedModule {}
