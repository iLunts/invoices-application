import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Contractor } from 'src/app/models/contractor.model';
import { ModalController } from '@ionic/angular';
import { ContractorListModalComponent } from '../../modals/contractor-list-modal/contractor-list-modal.component';

@Component({
  selector: 'app-contractor-panel',
  templateUrl: './contractor-panel.component.html',
  styleUrls: ['./contractor-panel.component.less'],
})
export class ContractorPanelComponent implements OnInit {
  @Input() isViewMode = false;
  @Input() set setContractor(value) {
    if (value) {
      this.selectedContractor = value;
    }
  }
  @Output() contractor = new EventEmitter<Contractor>();
  selectedContractor: Contractor;

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
        this.contractor.emit(this.selectedContractor);
      }
    });

    return await modal.present();
  }
}
