import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ServiceListModalComponent } from 'src/app/components/modals/service-list-modal/service-list-modal.component';
import {
  Act,
  ActListItem,
  ActStatus,
  OrderList,
} from 'src/app/models/act.model';
import { Contractor } from 'src/app/models/contractor.model';
import { Invoice, InvoiceListItem } from 'src/app/models/invoice.model';
import { Service } from 'src/app/models/service.model';
import { ActService } from 'src/app/services/act.service';
import { ContractorService } from 'src/app/services/contractor.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as _ from 'lodash';
import { ContractService } from 'src/app/services/contract.service';
import { Contract } from 'src/app/models/contract.model';

@Component({
  selector: 'app-acts-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ActsCreateComponent implements OnInit {
  act: Act = new Act();
  selectedContractor: Contractor;
  serviceList: InvoiceListItem[] = [new InvoiceListItem()];
  actStatusList: ActStatus[] = [];
  toastPopover: any;

  customStatusActionSheetOptions: any = {
    // header: 'Статусы',
    subHeader: 'Выберите статус для этого акта',
    cssClass: 'select-action-sheet',
  };
  invoice: Invoice = new Invoice();
  contractList: Contract[];

  constructor(
    private _modal: ModalController,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notification: NotificationService,
    private _act: ActService,
    private _contractor: ContractorService,
    private _invoice: InvoiceService,
    private _contract: ContractService
  ) {
    this._route.queryParams.subscribe((params) => {
      if (params.contractorId) {
        this.fetchContractor(params.contractorId);
        this.fetchContract(params.contractorId);
      }
      if (params.invoiceId) {
        this.fetchInvoice(params.invoiceId);
      }
    });

    this.getStatuses();
    // this.signaturePad = new SignaturePad(
    //   this.signaturePadElement.nativeElement
    // );
  }

  ngOnInit() {}

  fetchContractor(contractorId: string) {
    this._contractor
      .getById(contractorId)
      .valueChanges()
      .subscribe((response: any) => {
        if (response && response.length) {
          this.selectContractor(response[0]);
        }
      });
  }

  fetchInvoice(invoiceId: string) {
    this._invoice
      .getById(invoiceId)
      .valueChanges()
      .subscribe((response: any) => {
        if (response && response.length) {
          this.invoice = response[0];
          this.act._invoiceId = this.invoice._id;

          this.initServiceList(this.invoice.services);
        }
      });
  }

  fetchContract(contractorId: string) {
    this._contract
      .getAllByContractorId(contractorId)
      .subscribe((response: Contract[]) => {
        if (response && response.length) {
          this.contractList = response;

          if (this.contractList && this.contractList.length > 0) {
            this.act._contractId = this.contractList[0]._id;
          }
        }
      });
  }

  getStatuses() {
    this._act.getAllStatus().subscribe((response: ActStatus[]) => {
      if (response) {
        this.actStatusList = response;
        this.act.status = this.actStatusList[0];
      }
    });
  }

  initServiceList(serviceList: any) {
    serviceList.forEach((element, index) => {
      this.act.orderList.push(new OrderList(new Date(), element, index));
    });

    this.groupOrderListByDate();
    this.calculateTotalSum();
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
      this.act.contractor = contractor;
    } else {
      this.selectedContractor = null;
      this.act.contractor = null;
    }
  }

  changeStatus(event) {
    this.act.status = event.detail.value;
  }

  save() {
    // this.act.services = this.serviceList;

    if (!this.checkCanCreateInvoice()) {
      return;
    }
    this.calculateTotalSum();
    console.log('Save');
    this._act.add(this.act).subscribe((response: any) => {
      this._notification.success('Акт успешно создан');
      this._router.navigate(['/act'], { replaceUrl: true });
    });
  }

  addSignature(event) {
    this.act.signature.sign = event;
  }

  groupOrderListByDate() {
    let arr: any[] = [];
    let obj: any = _.groupBy(this.act.orderList, 'date');
    Object.keys(obj).map((key) => {
      arr.push({
        groupName: key,
        groupList: obj[key],
      });
    });

    return arr;
  }

  calculateTotalSum(): void {
    this.act.total.totalSum.amount = 0;
    this.act.orderList.forEach((element) => {
      if (element) {
        this.act.total.totalSum.amount +=
          element.service.count * element.service.price;
      }
    });
  }
}
