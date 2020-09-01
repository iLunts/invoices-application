import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContractorListModalComponent } from 'src/app/components/modals/contractor-list-modal/contractor-list-modal.component';
import { Contractor } from 'src/app/models/contractor.model';
import { InvoiceListItem } from 'src/app/models/invoice.model';
import { ServiceListModalComponent } from 'src/app/components/modals/service-list-modal/service-list-modal.component';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class InvoiceCreateComponent implements OnInit {
  selectedContractor: Contractor;
  serviceList: InvoiceListItem[] = [new InvoiceListItem()];

  constructor(private _modal: ModalController) {}

  ngOnInit() {}

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

  save() {
    console.log('Save');
  }

  checkCanCreateInvoice(): boolean {
    let canCreate = true;

    // Check contractor
    if (!this.selectedContractor) {
      canCreate = false;
    }

    // Check service list
    // if (!this.serviceList) {
    //   canCreate = false;
    // } else {
    //   this.serviceList.forEach((element) => {
    //     if (element.service === null) {
    //       canCreate = false;
    //     }
    //   });
    // }

    return canCreate;
  }

  selectContractor(contractor: Contractor) {
    if (contractor) {
      this.selectedContractor = contractor;
    } else {
      this.selectedContractor = null;
    }
  }
}
