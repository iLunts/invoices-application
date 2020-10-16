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

@Component({
  selector: 'app-invoice-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class InvoiceCreateComponent implements OnInit {
  invoice: Invoice;
  selectedContractor: Contractor;
  serviceList: InvoiceListItem[] = [new InvoiceListItem()];
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

  constructor(
    private _modal: ModalController,
    private _invoice: InvoiceService,
    private _router: Router,
    private _notification: NotificationService
  ) {
    // this.signaturePad = new SignaturePad(
    //   this.signaturePadElement.nativeElement
    // );

    this.invoice = new Invoice();
    this.invoice.type = this.invoiceTypeList[0];
    this.getStatuses();
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
      console.log(data.data);
      if (data.data.selectedService) {
        this.serviceList[index] = data.data.selectedService;
      } else {
        this.serviceList.splice(this.serviceList.length - 1, 1);
      }
    });

    return await modal.present();
  }

  addService() {
    this.serviceList.push(new InvoiceListItem());
    this.showServiceModal(this.serviceList.length - 1);
  }

  removeService(service: Service) {
    const index = this.serviceList.findIndex(
      (element: any) => element._id === service._id
    );

    if (index !== -1) {
      this.serviceList.splice(index, 1);
    }

    if (!this.serviceList.length) {
      this.serviceList.push(new InvoiceListItem());
    }
  }

  checkEmptyLastServiceList(): boolean {
    return this.serviceList[this.serviceList.length - 1].service !== null;
  }

  getTotalSum() {
    let total = 0;
    if (this.serviceList && this.serviceList.length) {
      this.serviceList.forEach((element: any) => {
        if (element.service === null) {
          return;
        } else {
          total += element.count * element.price;
        }
      });
    }
    return total;
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
    this.invoice.services = this.serviceList;

    if (!this.checkCanCreateInvoice()) {
      return;
    }
    console.log('Save');
    this._invoice.add(this.invoice).subscribe((response: any) => {
      this._notification.success('Счет успешно создан');
      this._router.navigate(['/invoice'], { replaceUrl: true });
    });
  }

  addSignature(event) {
    this.invoice.signature.sign = event;
  }

  calculateTotalSum(): void {
    this.invoice.total.totalSum.amount = 0;
    this.serviceList.forEach((element) => {
      if (element) {
        this.invoice.total.totalSum.amount +=
          element.service.count * element.service.price;
      }
    });
  }
}
