import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Invoice } from 'src/app/models/invoice.model';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class InvoiceListComponent implements OnInit {
  // @ViewChild('htmlData') htmlData: ElementRef;

  // listData: Contractor[] = [];
  // listData: Observable<Invoice[]>;
  listData: Invoice[] = [];
  invoiceStatuses: any[] = [];
  // isLoaded: boolean = true;
  isLoaded: boolean;
  isOn = false;
  QRSCANNED_DATA: string;
  scannedData: {};

  constructor(
    public _db: AngularFireDatabase,
    private _invoice: InvoiceService,
    private _router: Router,
    private _notification: NotificationService,
    private _qrScanner: QRScanner
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

  // qrScan(): void {
  //   // Optionally request the permission early
  //   this._qrScanner
  //     .prepare()
  //     .then((status: QRScannerStatus) => {
  //       if (status.authorized) {
  //         // camera permission was granted

  //         // start scanning
  //         let scanSub = this._qrScanner.scan().subscribe((text: string) => {
  //           console.log('Scanned something', text);

  //           // this._qrScanner.hide(); // hide camera preview
  //           // scanSub.unsubscribe(); // stop scanning
  //         });
  //       } else if (status.denied) {
  //         // camera permission was permanently denied
  //         // you must use QRScanner.openSettings() method to guide the user to the settings page
  //         // then they can grant the permission from there
  //         console.log('QR: camera permission was permanently denied');
  //       } else {
  //         // permission was denied, but not permanently. You can ask for permission again at a later time.
  //         console.log(
  //           'QR: permission was denied, but not permanently. You can ask for permission again at a later time.'
  //         );
  //       }
  //     })
  //     .catch((e: any) => console.log('Error is', e));
  // }

  qrScan(): void {
    this._qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.isOn = true;

          // start scanning
          const scanSub = this._qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.isOn = false;

            this.QRSCANNED_DATA = text;
            if (this.QRSCANNED_DATA !== '') {
              this.closeScanner();
              scanSub.unsubscribe();
            }
          });
          this._qrScanner.show();
        } else if (status.denied) {
          console.log('camera permission denied');
          this._qrScanner.openSettings();
        } else {
        }
      })
      .catch((e: any) => {
        console.log('Error is', e);
      });
  }

  closeScanner() {
    this.isOn = false;
    this._qrScanner.hide();
    this._qrScanner.destroy();
  }
}
