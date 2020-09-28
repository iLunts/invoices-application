import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Contract } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import { ActionSheetController } from '@ionic/angular';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';

@Component({
  selector: 'app-contract-panel',
  templateUrl: './contract-panel.component.html',
  styleUrls: ['./contract-panel.component.less'],
})
export class ContractPanelComponent implements OnInit {
  @Input() set invoice(value) {
    if (value) {
      this.selectedContract = value;
    }
  }

  selectedContract: Contract;

  constructor(
    private _contract: ContractService,
    private _actionSheet: ActionSheetController,
    private _templatePdf: TemplatePdfService,
  ) {}

  ngOnInit() {}

  getDate(date: any) {
    return moment(date).format('YYYY');
  }

  delete() {
    if (!this.selectedContract) {
      return;
    }
    this._contract.delete(this.selectedContract._id).then();
  }

  async showMore(id) {
    const actionSheet = await this._actionSheet.create({
      header: 'Выберите действие',
      buttons: this.generateActionButtons(),
    });

    await actionSheet.present();
  }

  generateActionButtons() {
    let buttons: any[] = [
      {
        text: 'Скачать договор',
        handler: () => {
          this._templatePdf.downloadPdf('contract', this.selectedContract);
        },
      },
      {
        text: 'Удалить',
        role: 'destructive',
        handler: () => {
          this.delete();
        },
      },
      {
        text: 'Отменить',
        role: 'cancel',
        handler: () => {},
      },
    ];

    return buttons;
  }
}
