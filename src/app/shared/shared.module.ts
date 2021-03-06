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
import { ContractPanelComponent } from '../components/ui/contract-panel/contract-panel.component';
import { AccordionLineComponent } from '../components/ui/accordion-line/accordion-line.component';
import { BankPanelComponent } from '../components/ui/bank-panel/bank-panel.component';
import { BankListModalComponent } from '../components/modals/bank-list-modal/bank-list-modal.component';

import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { OverlayComponent } from '../components/ui/overlay/overlay.component';
import { FieldComponent } from '../components/ui/fields/field/field.component';
import { FieldSwiftComponent } from '../components/ui/fields/field-swift/field-swift.component';
import { SignaturePadComponent } from '../components/ui/signature-pad/signature-pad.component';
import { SignaturePanelComponent } from '../components/ui/signature-panel/signature-panel.component';
import { ActPanelComponent } from '../components/ui/act-panel/act-panel.component';
import { RangeMasterPanelComponent } from '../components/ui/range-master-panel/range-master-panel.component';
// import { AngularSignaturePadModule } from 'angular-signature-pad/angular-signature-pad';
import { QRCodeModule } from 'angularx-qrcode';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FilterPipe } from '../pipes/filter.pipe';
import { CheckProfileDirective } from '../directives/check-profile.directive';
import { ProfileNotificatorComponent } from '../components/ui/profile-notificator/profile-notificator.component';

let loaderOptions = {
  img: '/assets/svg/pack/loader.svg',
  loaderStyles: {
    background: 'rgba(255, 255, 255, 0.8)',
  },
  imgStyles: {
    width: '30px',
    // background: 'yellow',
  },
  rotate: {
    duration: 5000,
    // direction: 'reverse'
  },
};

@NgModule({
  declarations: [
    ContractorItemComponent,
    ContractorPanelComponent,
    ContractPanelComponent,
    InvoiceServiceItemComponent,
    InvoicePanelComponent,
    ActPanelComponent,
    ServicePanelComponent,
    SignaturePadComponent,
    SignaturePanelComponent,
    EmptyComponent,
    ContractorListModalComponent,
    ServiceListModalComponent,
    BankListModalComponent,
    AccordionLineComponent,
    BankPanelComponent,
    OverlayComponent,
    FieldComponent,
    FieldSwiftComponent,
    RangeMasterPanelComponent,
    FilterPipe,
    CheckProfileDirective,
    ProfileNotificatorComponent,
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
    NgxLoaderIndicatorModule.forRoot(loaderOptions),
    NgxMaskModule.forRoot(),
    // AngularSignaturePadModule.forRoot(),
    QRCodeModule,
    AngularSvgIconModule.forRoot(),
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
    FieldComponent,
    FieldSwiftComponent,
    RangeMasterPanelComponent,
    ContractorItemComponent,
    ContractorPanelComponent,
    ContractPanelComponent,
    InvoiceServiceItemComponent,
    InvoicePanelComponent,
    ActPanelComponent,
    ServicePanelComponent,
    SignaturePanelComponent,
    EmptyComponent,
    AccordionLineComponent,
    BankPanelComponent,
    NgxLoaderIndicatorModule,
    NgxMaskModule,
    QRCodeModule,
    AngularSvgIconModule,
    FilterPipe,
    CheckProfileDirective,
    ProfileNotificatorComponent,
  ],
  entryComponents: [
    ContractorListModalComponent,
    ServiceListModalComponent,
    BankListModalComponent,
    OverlayComponent,
    SignaturePadComponent,
  ],
})
export class SharedModule {}
