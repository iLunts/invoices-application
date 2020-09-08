import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import * as moment from 'moment';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ActionSheetController } from '@ionic/angular';
import { InvoicePdfService } from 'src/app/services/invoice-pdf.service';

@Component({
  selector: 'app-invoice-panel',
  templateUrl: './invoice-panel.component.html',
  styleUrls: ['./invoice-panel.component.less'],
})
export class InvoicePanelComponent implements OnInit {
  @Input() set invoice(value) {
    if (value) {
      this.selectedInvoice = value;
    }
  }

  selectedInvoice: Invoice;

  constructor(
    private _invoice: InvoiceService,
    private _invoicePdf: InvoicePdfService,
    private _actionSheet: ActionSheetController
  ) {}

  ngOnInit() {}

  getDate(date: any) {
    return moment(date).format('YYYY');
  }

  delete() {
    if (!this.selectedInvoice) {
      return;
    }
    this._invoice.delete(this.selectedInvoice._id).then();
  }

  async showMore(id) {
    const actionSheet = await this._actionSheet.create({
      header: 'Выберите действие',
      buttons: [
        {
          text: 'Предпросмотр',
          handler: () => {
            this._invoicePdf.openPDF(this.selectedInvoice);
          },
        },
        {
          text: 'Скачать PDF',
          handler: () => {
            this._invoicePdf.downloadPdf(this.selectedInvoice);
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
          // icon: 'close',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
