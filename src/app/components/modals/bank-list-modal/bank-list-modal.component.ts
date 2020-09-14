import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank.model';
import { ModalController } from '@ionic/angular';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-bank-list-modal',
  templateUrl: './bank-list-modal.component.html',
  styleUrls: ['./bank-list-modal.component.less'],
})
export class BankListModalComponent implements OnInit {
  bankList: Bank[] = [];
  selectedBank: Bank;

  constructor(
    private _modal: ModalController,
    private _bank: BankService
  ) {
    this.fetch();
  }

  ngOnInit() {}

  fetch() {
    this._bank
      .getAll()
      .valueChanges()
      .subscribe((response: Bank[]) => {
        if (response) {
          this.bankList = response;
        }
      });
  }

  close() {
    this._modal.dismiss({
      dismissed: true,
      selectedBank: this.selectedBank,
    });
  }

  select(data) {
    this.selectedBank = data;
    this.close();
  }
}