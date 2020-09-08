import { Component, OnInit, OnDestroy } from '@angular/core';
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

  customStatusActionSheetOptions: any = {
    // header: 'Статусы',
    subHeader: 'Выберите статус для этого счета',
    cssClass: 'select-action-sheet',
  };

  constructor(
    private _modal: ModalController,
    private _invoice: InvoiceService,
    private _toast: ToastController,
    private _router: Router
  ) {
    this.invoice = new Invoice();
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

  async success(message?: string, duration?: number) {
    this.toastPopover = await this._toast.create({
      message: message || 'Успешно.',
      duration: duration || 3000,
      color: 'success',
    });
    this.toastPopover.present();
  }

  changeStatus(event) {
    this.invoice.status = event.detail.value;
  }

  save() {
    this.invoice.services = this.serviceList;

    if (!this.checkCanCreateInvoice()) {
      return;
    }
    console.log('Save');
    this._invoice.add(this.invoice).subscribe((response: any) => {
      this.success('Счет успешно создан');
      this._router.navigate(['/invoice'], { replaceUrl: true });
    });
  }
}
