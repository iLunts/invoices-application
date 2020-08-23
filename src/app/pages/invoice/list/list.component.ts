import { Component, OnInit } from '@angular/core';
import { Contractor } from 'src/app/models/contractor.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class InvoiceListComponent implements OnInit {
  listData: Contractor[] = [];
  invoiceStatuses: any[] = [];
  isLoaded: boolean;

  constructor(
    public _db: AngularFireDatabase,
    private _invoice: InvoiceService
  ) {}

  ngOnInit() {
    this.fetchStatuses();
    this.fetch();
  }

  fetchStatuses() {
    this._invoice.getAllStatus().subscribe((data: any) => {
      this.invoiceStatuses = data;
    });
  }

  fetch() {
    this.isLoaded = false;
    this._invoice
      .getAll()
      .valueChanges()
      .subscribe((data: any) => {
        this.listData = data;
        this.isLoaded = true;
      });
  }

  delete(_doc: string) {
    this._invoice.delete(_doc).catch((error) => {
      // this._notification.error('Error delete: ' + error);
      // console.log('Error delete: ', error);
    });
  }
}
