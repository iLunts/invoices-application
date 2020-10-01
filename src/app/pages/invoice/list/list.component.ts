import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class InvoiceListComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;

  // listData: Contractor[] = [];
  // listData: Observable<Invoice[]>;
  listData: Invoice[] = [];
  invoiceStatuses: any[] = [];
  // isLoaded: boolean = true;
  isLoaded: boolean;

  constructor(
    public _db: AngularFireDatabase,
    private _invoice: InvoiceService,
    private _router: Router,
    private _notification: NotificationService
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
    this._invoice.getAll().subscribe((response: any) => {
      this.listData = response;
      this.isLoaded = true;
    });
  }

  delete(_id: string) {
    this._invoice.delete(_id).then((response: any) => {
      this._notification.success('Счет успешно удален');
    });
  }

  createNew() {
    this._router.navigate(['invoice/create'], { replaceUrl: true });
  }
}
