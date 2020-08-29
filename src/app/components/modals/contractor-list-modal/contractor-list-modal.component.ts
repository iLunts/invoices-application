import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContractorService } from 'src/app/services/contractor.service';
import { Contractor } from 'src/app/models/contractor.model';

@Component({
  selector: 'app-contractor-list-modal',
  templateUrl: './contractor-list-modal.component.html',
  styleUrls: ['./contractor-list-modal.component.less'],
})
export class ContractorListModalComponent implements OnInit {
  contractorList: Contractor[] = [];
  selectedContractor: Contractor;

  constructor(
    private _modal: ModalController,
    private _contractor: ContractorService
  ) {
    this.fetch();
  }

  ngOnInit() {}

  fetch() {
    this._contractor
      .getAll()
      .valueChanges()
      .subscribe((response: Contractor[]) => {
        if (response) {
          this.contractorList = response;
        }
      });
  }

  close() {
    this._modal.dismiss({
      dismissed: true,
      selectedContractor: this.selectedContractor,
    });
  }

  select(data) {
    this.selectedContractor = data;
    this.close();
  }
}
