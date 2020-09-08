import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice.model';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class InvoicePdfService {
  constructor() {}

  downloadPdf(invoice: Invoice) {
    let doc = new jsPDF('p', 'pt', 'a4');

    doc.text('Hello world!', 10, 10);

    // let handleElement = {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   },
    // };
    // doc.fromHTML(DATA.innerHTML, 15, 15, {
    //   width: 200,
    //   elementHandlers: handleElement,
    // });

    doc.save('angular-demo.pdf');
  }

  openPDF(invoice: Invoice): void {
    // let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p', 'pt', 'a4');
    doc.text('Hello world!', 10, 10);
    // doc.html(DATA, {
    //   callback: () => {
    //     doc.output('dataurlnewwindow');
    //   },
    // });
    // doc.fromHTML(DATA.innerHTML, 15, 15);
    doc.output('dataurlnewwindow');
  }
}
