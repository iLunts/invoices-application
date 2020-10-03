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
  INVOICE_TEMPLATE_HEADER,
  INVOICE_TEMPLATE_LOGO,
  INVOICE_TEMPLATE_NOTE,
  INVOICE_TEMPLATE_SIGN,
  INVOICE_TEMPLATE_TABLE,
} from '../templates/contracts/invoice';
import * as moment from 'moment';
import { reduce } from 'rxjs/operators';
import { SumToWord } from '../utils/sumToWord';
import { Invoice } from '../models/invoice.model';

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
        let blob = new Blob([buffer], { type: 'application/pdf' });

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
    let defaultStyle: {
      fontSize: 12;
      bold: false;
      margin: [0, 0, 0, 0];
    };

    let template = Handlebars.compile(CONTRACT_TEMPLATE);
    let html = template(data, {
      tableAutoSize: true,
      defaultStyle: defaultStyle,
    });
    let result = htmlToPdfmake(html);

    let docDefinition = {
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

  createInvoicePdf(data?: Invoice) {
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
    Handlebars.registerHelper('getSum', function (count, price) {
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

    // Get total SUM
    Handlebars.registerHelper('getTotalSum', function () {
      // return SumToWord.toWordsConverter('123');
      return this.toWordsConverter('123');
    });

    // Get count services
    Handlebars.registerHelper('getCountService', function () {
      if (data.services) {
        return Object.keys(data.services).length;
      } else {
        return 0;
      }
    });

    // Default styles obj
    let defaultStyle: {
      fontSize: 12;
      bold: false;
      margin: [0, 0, 0, 0];
    };

    let template = Handlebars.compile(
      INVOICE_TEMPLATE_LOGO +
        INVOICE_TEMPLATE_HEADER +
        INVOICE_TEMPLATE_TABLE +
        INVOICE_TEMPLATE_NOTE +
        INVOICE_TEMPLATE_SIGN
    );
    let html = template({
      invoice: data,
      profile: { test: 'ООО ТЕСТОВАЯ КОМПАНИЯ' },
    });
    let result = htmlToPdfmake(html, {
      tableAutoSize: true,
      defaultStyle: defaultStyle,
    });

    let docDefinition = {
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
        'invoice-cell-footer-label': {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 0],
          alignment: 'right',
        },
        'invoice-cell-footer-summa': {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 0],
          alignment: 'center',
        },
        'invoice-note': {
          fontSize: 12,
          bold: false,
          margin: [60, 0, 60, 0],
          alignment: 'left',
        },
        'invoice-sign': {
          fontSize: 10,
          bold: false,
          margin: [100, 0, 0, 0],
          alignment: 'left',
        },
      },
    };

    // this.pdfObj = pdfMake.createPdf({ content: [...result] });
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  rub = '';
  kop = '';
  money;
  price;
  litera = '';
  sotny = '';
  desatky = '';
  edinicy = '';
  minus = '';

  k = 0;
  i = 0;
  j = 0;
  N = [
    '',
    'один',
    'два',
    'три',
    'четыре',
    'пять',
    'шесть',
    'семь',
    'восемь',
    'девять',
    '',
    'одиннадцать',
    'двенадцать',
    'тринадцать',
    'четырнадцать',
    'пятнадцать',
    'шестнадцать',
    'семнадцать',
    'восемнадцать',
    'девятнадцать',
    '',
    'десять',
    'двадцать',
    'тридцать',
    'сорок',
    'пятьдесят',
    'шестьдесят',
    'семьдесят',
    'восемьдесят',
    'девяносто',
    '',
    'сто',
    'двести',
    'триста',
    'четыреста',
    'пятьсот',
    'шестьсот',
    'семьсот',
    'восемьсот',
    'девятьсот',
    'тысяч',
    'тысяча',
    'тысячи',
    'тысячи',
    'тысячи',
    'тысяч',
    'тысяч',
    'тысяч',
    'тысяч',
    'тысяч',
    'миллионов',
    'миллион',
    'миллиона',
    'миллиона',
    'миллиона',
    'миллионов',
    'миллионов',
    'миллионов',
    'миллионов',
    'миллионов',
    'миллиардов',
    'миллиард',
    'миллиарда',
    'миллиарда',
    'миллиарда',
    'миллиардов',
    'миллиардов',
    'миллиардов',
    'миллиардов',
    'миллиардов',
  ];

  M = new Array(10);
  R = new Array(
    'рублей',
    'рубль',
    'рубля',
    'рубля',
    'рубля',
    'рублей',
    'рублей',
    'рублей',
    'рублей',
    'рублей'
  );
  K = new Array(
    'копеек',
    'копейка',
    'копейки',
    'копейки',
    'копейки',
    'копеек',
    'копеек',
    'копеек',
    'копеек',
    'копеек'
  );

  toWordsConverter(val) {
    for (let j = 0; j < 10; ++j) {
      this.M[j] = new Array(this.N.length);
    }
    for (let i = 0; i < this.N.length; i++) {
      for (let j = 0; j < 10; j++) {
        this.M[j][i] = this.N[this.k++];
      }
    }
    return this.num2str(this.money);
  }

  num2str(money) {
    (this.rub = ''), (this.kop = '');
    money = money.replace(',', '.');
    if (isNaN(money)) {
      return 'Не числовое значение';
    }
    if (money.substr(0, 1) == '-') {
      money = money.substr(1);
      this.minus = 'минус ';
    } else {
      this.minus = '';
    }
    money = Math.round(money * 100) / 100 + '';
    if (money.indexOf('.') != -1) {
      this.rub = money.substr(0, money.indexOf('.'));
      this.kop = money.substr(money.indexOf('.') + 1);
      if (this.kop.length == 1) {
        this.kop += '0';
      }
    } else {
      this.rub = money;
    }
    if (this.rub.length > 12) {
      return 'Слишком большое число';
    }
    let res;
    let ru = this.propis((this.price = this.rub), this.R);
    let ko = this.propis((this.price = this.kop), this.K);
    ko != '' ? (res = ru + ' ' + ko) : (res = ru);
    ru == 'Ноль ' + this.R[0] && ko != '' ? (res = ko) : 0;
    this.kop == '0' ? (res += ' ноль ' + this.K[0]) : 0;
    return (
      (this.minus + res).substr(0, 1).toUpperCase() +
      (this.minus + res).substr(1)
    );
  }

  propis(price, D) {
    let litera = '';
    for (let i = 0; i < price.length; i += 3) {
      let sotny = '';
      let desatky = '';
      let edinicy = '';
      if (this.n(i + 2, 2) > 10 && this.n(i + 2, 2) < 20) {
        edinicy =
          ' ' + this.M[this.n(i + 1, 1)][1] + ' ' + this.M[0][i / 3 + 3];
        i == 0 ? (edinicy += D[0]) : 0;
      } else {
        edinicy = this.M[this.n(i + 1, 1)][0];
        edinicy == 'один' && (i == 3 || D == this.K) ? (edinicy = 'одна') : 0;
        edinicy == 'два' && (i == 3 || D == this.K) ? (edinicy = 'две') : 0;
        i == 0 && edinicy != ''
          ? 0
          : (edinicy += ' ' + this.M[this.n(i + 1, 1)][i / 3 + 3]);
        edinicy == ' '
          ? (edinicy = '')
          : edinicy == ' ' + this.M[this.n(i + 1, 1)][i / 3 + 3]
          ? 0
          : (edinicy = ' ' + edinicy);
        i == 0 ? (edinicy += ' ' + D[this.n(i + 1, 1)]) : 0;
        (desatky = this.M[this.n(i + 2, 1)][2]) != ''
          ? (desatky = ' ' + desatky)
          : 0;
      }
      (sotny = this.M[this.n(i + 3, 1)][3]) != '' ? (sotny = ' ' + sotny) : 0;
      if (
        this.price.substr(this.price.length - i - 3, 3) == '000' &&
        edinicy == ' ' + this.M[0][i / 3 + 3]
      ) {
        edinicy = '';
      }
      litera = sotny + desatky + edinicy + litera;
    }
    if (litera == ' ' + this.R[0]) {
      return 'ноль' + litera;
    } else {
      return litera.substr(1);
    }
  }

  n(start, len) {
    if (start > this.price.length) {
      return 0;
    } else {
      return Number(this.price.substr(this.price.length - start, len));
    }
  }
}
