import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import * as moment from 'moment';
import { Act } from 'src/app/models/act.model';
import { ActService } from 'src/app/services/act.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';

@Component({
  selector: 'app-act-panel',
  templateUrl: './act-panel.component.html',
  styleUrls: ['./act-panel.component.less'],
})
export class ActPanelComponent implements OnInit {
  @Input() set data(value) {
    if (value) {
      this.selectedAct = value;
    }
  }

  selectedAct: Act = new Act();

  constructor(
    private _act: ActService,
    private _templatePdf: TemplatePdfService,
    private _actionSheet: ActionSheetController
  ) {}

  ngOnInit() {}

  getDate(date: any) {
    return moment(date).format('YYYY');
  }

  async showMore() {
    const actionSheet = await this._actionSheet.create({
      header: 'Выберите действие',
      cssClass: 'invoice-action-sheet',
      buttons: this.generateActionButtons(),
    });

    await actionSheet.present();
  }

  generateActionButtons() {
    let buttons: any[] = [
      {
        text: 'Скачать акт',
        role: 'download',
        handler: () => {
          this._templatePdf.downloadPdf('act', this.selectedAct);
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

  delete() {
    if (!this.selectedAct) {
      return;
    }
    this._act.delete(this.selectedAct._id).then();
  }
}
