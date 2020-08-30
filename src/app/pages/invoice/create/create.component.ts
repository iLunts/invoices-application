import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContractorListModalComponent } from 'src/app/components/modals/contractor-list-modal/contractor-list-modal.component';
import { Contractor } from 'src/app/models/contractor.model';
import { InvoiceListItem } from 'src/app/models/invoice.model';
import { ServiceListModalComponent } from 'src/app/components/modals/service-list-modal/service-list-modal.component';

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

  async showContractorModal() {
    const modal = await this._modal.create({
      component: ContractorListModalComponent,
      cssClass: 'modal-contractor',
    });

    modal.onDidDismiss().then((data) => {
      console.log(data.data);
      if (data.data.selectedContractor) {
        this.selectedContractor = data.data.selectedContractor;
      }
    });

    return await modal.present();
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
      }
    });

    return await modal.present();
  }

  addInvoice() {
    this.serviceList.push(new InvoiceListItem());
  }

  removeService(index) {
    this.serviceList.splice(index, 1);
  }

  save() {
    console.log('Save');
  }
}
