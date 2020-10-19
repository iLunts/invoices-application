import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ContractorListModalComponent } from 'src/app/components/modals/contractor-list-modal/contractor-list-modal.component';
import { Contractor } from 'src/app/models/contractor.model';
import {
  InvoiceListItem,
  Invoice,
  InvoiceStatus,
} from 'src/app/models/invoice.model';
import { ServiceListModalComponent } from 'src/app/components/modals/service-list-modal/service-list-modal.component';
import { Service } from 'src/app/models/service.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import SignaturePad from 'signature_pad';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class InvoiceCreateComponent implements OnInit {
  @ViewChild('qrBlock') qrBlock: any;

  invoice: Invoice;
  selectedContractor: Contractor;
  serviceList: Service[] = [new Service()];
  invoiceStatusList: InvoiceStatus[] = [];
  toastPopover: any;
  invoiceTypeList: any[] = [
    {
      name: 'Счет',
      value: 'invoice',
    },
    {
      name: 'Счет-протокол',
      value: 'invoice-protocol',
    },
  ];

  customStatusActionSheetOptions: any = {
    // header: 'Статусы',
    subHeader: 'Выберите статус для этого счета',
    cssClass: 'select-action-sheet',
  };
  qrdata: string;

  constructor(
    private _modal: ModalController,
    private _invoice: InvoiceService,
    private _router: Router,
    private _notification: NotificationService,
    private _fs: AngularFirestore,
    private elementRef: ElementRef,
    private _auth: AuthService
  ) {
    // this.signaturePad = new SignaturePad(
    //   this.signaturePadElement.nativeElement
    // );

    this.invoice = new Invoice();
    this.invoice._id = this._fs.createId();
    this.invoice.type = this.invoiceTypeList[0];
    this.getStatuses();
    this.generateQrCode();
  }

  ngOnInit() {}

  getStatuses() {
    this._invoice.getAllStatus().subscribe((response: InvoiceStatus[]) => {
      if (response) {
        this.invoiceStatusList = response;
        this.invoice.status = this.invoiceStatusList[0];
      }
    });
  }

  async showServiceModal(index) {
    const modal = await this._modal.create({
      component: ServiceListModalComponent,
      cssClass: 'modal-service',
    });

    modal.onDidDismiss().then((data) => {
      if (data.data.selectedService) {
        this.invoice.services.push(data.data.selectedService);
      } else {
        this.serviceList.splice(this.invoice.services.length - 1, 1);
      }
      this.calculateTotalSum();
    });

    return await modal.present();
  }

  addService() {
    // this.invoice.services.push(new Service());
    this.showServiceModal(this.serviceList.length - 1);
  }

  removeService(service: Service) {
    const index = this.invoice.services.findIndex(
      (element: any) => element._id === service._id
    );

    if (index !== -1) {
      this.invoice.services.splice(index, 1);
    }

    this.calculateTotalSum();
  }

  checkCanCreateInvoice(): boolean {
    let canCreate = true;

    // Check contractor
    if (!this.selectedContractor) {
      canCreate = false;
    }

    return canCreate;
  }

  selectContractor(contractor: Contractor) {
    if (contractor) {
      this.selectedContractor = contractor;
      this.invoice.contractor = contractor;
    } else {
      this.selectedContractor = null;
      this.invoice.contractor = null;
    }
  }

  changeStatus(event) {
    this.invoice.status = event.detail.value;
  }

  changeType(event) {
    this.invoice.type = event.detail.value;
  }

  save() {
    if (this.qrBlock) {
      this.invoice.qrCode = this.qrBlock.qrcElement.nativeElement.childNodes[0].currentSrc;
    }

    if (!this.checkCanCreateInvoice()) {
      return;
    }
    this._invoice.add(this.invoice).subscribe((response: any) => {
      this._notification.success('Счет успешно создан', 'top');
      this._router.navigate(['/invoice'], { replaceUrl: true });
    });
  }

  addSignature(event) {
    this.invoice.signature.sign = event;
  }

  calculateTotalSum(): void {
    this.invoice.total.totalSum.amount = 0;
    this.invoice.services.forEach((element, index) => {
      if (element._id) {
        this.invoice.total.totalSum.amount += element.count * element.price;
      }
    });
  }

  generateQrCode() {
    this.qrdata = this._auth.getUserId() + '@1@' + this.invoice._id;
  }
}
