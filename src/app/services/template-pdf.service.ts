import { Injectable } from '@angular/core';
// import { Invoice } from '../models/invoice.model';
// import { jsPDF } from 'jspdf';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';

import * as Handlebars from 'handlebars/dist/cjs/handlebars';
import { CONTRACT_TEMPLATE } from '../templates/contracts/contract';
import {
  INVOICE_TEMPLATE_FOOTER,
  INVOICE_TEMPLATE_HEADER,
  INVOICE_TEMPLATE_LOGO,
  INVOICE_TEMPLATE_TABLE,
} from '../templates/contracts/invoice';
import * as moment from 'moment';
import { reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TemplatePdfService {
  letterObj = {
    to: 'Contractor-1213123123123',
    from: 'Contractor-2222222222',
    text: 'Some text.....',
  };
  pdfObj = null;

  constructor(
    private _platform: Platform,
    private _file: File,
    private _fileOpener: FileOpener
  ) {}

  downloadPdf(type: string, obj?: any) {
    switch (type) {
      case 'invoice': {
        this.createInvoicePdf(obj);
        break;
      }
      case 'contract': {
        this.createContractPdf(obj);
        break;
      }
    }

    if (this._platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this._file
          .writeFile(this._file.dataDirectory, type + '.pdf', blob, {
            replace: true,
          })
          .then((fileEntry) => {
            // Open the PDf with the correct OS tools
            this._fileOpener.open(
              this._file.dataDirectory + type + '.pdf',
              'application/pdf'
            );
          });
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  createContractPdf(data?: any) {
    // Default styles obj
    var defaultStyle: {
      fontSize: 12;
      bold: false;
      margin: [0, 0, 0, 0];
    };

    var template = Handlebars.compile(CONTRACT_TEMPLATE);
    var html = template(data, {
      tableAutoSize: true,
      defaultStyle: defaultStyle,
    });
    var result = htmlToPdfmake(html);

    var docDefinition = {
      content: [result],
      styles: {
        'html-p': {
          fontSize: 10,
          bold: false,
          margin: [0, 0, 0, 0],
          alignment: 'justify',
        },
        'html-strong': {
          fontSize: 10,
          bold: false,
          margin: [0, 0, 0, 0],
          alignment: 'center',
        },
      },
    };

    // this.pdfObj = pdfMake.createPdf({ content: [...result] });
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  createInvoicePdf(data?: any) {
    // Date format
    Handlebars.registerHelper('formatDate', function (datetime, format) {
      if (moment) {
        // can use other formats like 'lll' too
        format = format || 'DD.MM.YYYY HH:mm';
        return moment(datetime).format(format);
      } else {
        return datetime;
      }
    });

    // Invoice number
    Handlebars.registerHelper('invoiceNumber', function (number) {
      if (number) {
        return number;
      } else {
        return 'б.н.';
      }
    });

    // Get summa
    Handlebars.registerHelper('getSumma', function (count, price) {
      if (!count || !price) {
        return 'NaN';
      } else {
        return count * price;
      }
    });

    // Get index
    Handlebars.registerHelper('getIndex', function (index) {
      if (index == null || index == undefined) {
        return '0';
      } else {
        return index + 1;
      }
    });

    // Default styles obj
    var defaultStyle: {
      fontSize: 12;
      bold: false;
      margin: [0, 0, 0, 0];
    };

    var template = Handlebars.compile(
      INVOICE_TEMPLATE_LOGO +
        INVOICE_TEMPLATE_HEADER +
        INVOICE_TEMPLATE_TABLE +
        INVOICE_TEMPLATE_FOOTER
    );
    var html = template({
      invoice: data,
      profile: { test: 'ООО ТЕСТОВАЯ КОМПАНИЯ' },
    });
    var result = htmlToPdfmake(html, {
      tableAutoSize: true,
      defaultStyle: defaultStyle,
    });

    var docDefinition = {
      content: [result],
      styles: {
        'html-p': {
          fontSize: 10,
          bold: false,
          margin: [0, 0, 0, 0],
          alignment: 'justify',
        },
        'html-strong': {
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 0],
          alignment: 'center',
        },
        'html-th': {
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 0],
          alignment: 'center',
        },
        'cell--bold': {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 0],
          alignment: 'center',
        },
      },
    };

    docDefinition;
    debugger;

    // this.pdfObj = pdfMake.createPdf({ content: [...result] });
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
}
