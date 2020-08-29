import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContractorListModalComponent } from 'src/app/components/modals/contractor-list-modal/contractor-list-modal.component';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class InvoiceCreateComponent implements OnInit {
  constructor(private _modal: ModalController) {}

  ngOnInit() {}

  async showContractorModal() {
    const modal = await this._modal.create({
      component: ContractorListModalComponent,
      cssClass: 'modal-contractor',
    });

    // const { data } = await modal.onWillDismiss();
    // console.log('Modal: ', data);

    modal.onDidDismiss().then((data) => {
      console.log(data.data);
    });

    return await modal.present();
  }
}
