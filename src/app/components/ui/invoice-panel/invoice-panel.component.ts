import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import * as moment from 'moment';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ActionSheetController } from '@ionic/angular';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { Router } from '@angular/router';

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
    private _templatePdf: TemplatePdfService,
    private _actionSheet: ActionSheetController,
    private _router: Router
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
      buttons: this.generateActionButtons(),
    });

    await actionSheet.present();
  }

  generateActionButtons() {
    let buttons: any[] = [
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

    if (this.selectedInvoice.contractId) {
      buttons.unshift({
        text: 'Скачать договор PDF',
        role: 'download',
        handler: () => {
          this._templatePdf.downloadPdf('contract');
        },
      });
    } else {
      buttons.unshift({
        text: 'Создать договор',
        role: 'download',
        handler: () => {
          this._router.navigate(['/contract/create'], {
            queryParams: {
              invoiceId: this.selectedInvoice._id,
              contractorId: this.selectedInvoice.contractor._id,
            },
            replaceUrl: true,
          });
        },
      });
    }

    return buttons;
  }
}
