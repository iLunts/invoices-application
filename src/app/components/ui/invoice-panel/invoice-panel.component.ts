import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import * as moment from 'moment';
import { InvoiceService } from 'src/app/services/invoice.service';

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
}
