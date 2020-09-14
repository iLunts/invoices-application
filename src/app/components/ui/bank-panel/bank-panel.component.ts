import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bank } from 'src/app/models/bank.model';
import { Contractor } from 'src/app/models/contractor.model';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractorListModalComponent } from '../../modals/contractor-list-modal/contractor-list-modal.component';
import { BankListModalComponent } from '../../modals/bank-list-modal/bank-list-modal.component';

@Component({
  selector: 'app-bank-panel',
  templateUrl: './bank-panel.component.html',
  styleUrls: ['./bank-panel.component.less'],
})
export class BankPanelComponent implements OnInit {
  @Input() isSelectMode = false;
  @Input() set setBank(value) {
    if (value) {
      this.selectedBank = value;
    }
  }
  @Output() bank = new EventEmitter<Bank>();
  @Output() select = new EventEmitter<Bank>();

  selectedBank: Bank;

  constructor(
    private _modal: ModalController,
    private _actionSheet: ActionSheetController,
    private _contractor: ContractorService
  ) {}

  ngOnInit() {}

  async showBankModal() {
    const modal = await this._modal.create({
      component: BankListModalComponent,
      cssClass: 'modal-bank',
    });

    modal.onDidDismiss().then((data) => {
      console.log(data.data);
      if (data.data.selectedBank) {
        this.selectedBank = data.data.selectedBank;
        this.bank.emit(this.selectedBank);
      }
    });

    return await modal.present();
  }

  selectBank() {
    this.select.emit(this.selectedBank);
  }
}

