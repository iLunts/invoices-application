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
import { CONTRACT_TEMPLATE } from '../templates/contracts/contract.template';
import {
  INVOICE_TEMPLATE_HEADER,
  INVOICE_TEMPLATE_LOGO,
  INVOICE_TEMPLATE_NOTE,
  INVOICE_TEMPLATE_QR_CODE,
  INVOICE_TEMPLATE_SIGN,
  INVOICE_TEMPLATE_TABLE,
} from '../templates/contracts/invoice.template';
import * as moment from 'moment';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class TemplatePdfService {
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
      case 'invoice-protocol': {
        this.createInvoicePdf(obj);
        break;
      }
      case 'contract': {
        this.createContractPdf(obj);
        break;
      }
      case 'act': {
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
    const sumToWord = this.sum_letters(data.total.totalSum.amount);
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

    // Get total SUM to word
    Handlebars.registerHelper('getTotalSum', function () {
      return sumToWord;
    });

    // Get total SUM to digs RUB and COP
    Handlebars.registerHelper('getTotalSumDigs', function () {
      let sum = Number(data.total.totalSum.amount).toFixed(2).split('.');
      return sum[0] + ' руб. ' + sum[1] + ' коп.';
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
        INVOICE_TEMPLATE_SIGN +
        INVOICE_TEMPLATE_QR_CODE
    );
    let html = template({
      invoice: data,
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

    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  num_letters(k, d?) {
    // целое число прописью, это основа
    k = k.toString();
    var i = '',
      e = [
        [
          '',
          'тысяч',
          'миллион',
          'миллиард',
          'триллион',
          'квадриллион',
          'квинтиллион',
          'секстиллион',
          'септиллион',
          'октиллион',
          'нониллион',
          'дециллион',
        ],
        ['а', 'и', ''],
        ['', 'а', 'ов'],
      ];
    if (k == '' || k == '0') return ' ноль'; // 0
    k = k.split(/(?=(?:\d{3})+$)/); // разбить число в массив с трёхзначными числами
    if (k[0].length == 1) k[0] = '00' + k[0];
    if (k[0].length == 2) k[0] = '0' + k[0];
    for (var j = k.length - 1; j >= 0; j--) {
      // соединить трёхзначные числа в одно число, добавив названия разрядов с окончаниями
      if (k[j] != '000') {
        i =
          (((d && j == k.length - 1) || j == k.length - 2) &&
          (k[j][2] == '1' || k[j][2] == '2')
            ? this.transformDigs(k[j], 1)
            : this.transformDigs(k[j])) +
          this.declOfNum(
            k[j],
            e[0][k.length - 1 - j],
            j == k.length - 2 ? e[1] : e[2]
          ) +
          i;
      }
    }
    return i;
  }

  transformDigs(k, d?) {
    // преобразовать трёхзначные числа
    var e = [
      [
        '',
        ' один',
        ' два',
        ' три',
        ' четыре',
        ' пять',
        ' шесть',
        ' семь',
        ' восемь',
        ' девять',
      ],
      [
        ' десять',
        ' одиннадцать',
        ' двенадцать',
        ' тринадцать',
        ' четырнадцать',
        ' пятнадцать',
        ' шестнадцать',
        ' семнадцать',
        ' восемнадцать',
        ' девятнадцать',
      ],
      [
        '',
        '',
        ' двадцать',
        ' тридцать',
        ' сорок',
        ' пятьдесят',
        ' шестьдесят',
        ' семьдесят',
        ' восемьдесят',
        ' девяносто',
      ],
      [
        '',
        ' сто',
        ' двести',
        ' триста',
        ' четыреста',
        ' пятьсот',
        ' шестьсот',
        ' семьсот',
        ' восемьсот',
        ' девятьсот',
      ],
      ['', ' одна', ' две'],
    ];
    return (
      e[3][k[0]] +
      (k[1] == 1 ? e[1][k[2]] : e[2][k[1]] + (d ? e[4][k[2]] : e[0][k[2]]))
    );
  }

  declOfNum(n, t, o) {
    // склонение именительных рядом с числительным: число (typeof = string), корень (не пустой), окончание
    var k = [2, 0, 1, 1, 1, 2, 2, 2, 2, 2];
    return t == ''
      ? ''
      : ' ' + t + (n[n.length - 2] == '1' ? o[2] : o[k[n[n.length - 1]]]);
  }

  razUp(e) {
    // сделать первую букву заглавной и убрать лишний первый пробел
    return e[1].toUpperCase() + e.substring(2);
  }

  sum_letters(a) {
    a = Number(a).toFixed(2).split('.'); // округлить до сотых и сделать массив двух чисел: до точки и после неё
    return this.razUp(
      this.num_letters(a[0]) +
        this.declOfNum(a[0], 'рубл', ['ь', 'я', 'ей']) +
        ' ' +
        a[1] +
        this.declOfNum(a[1], 'копе', ['йка', 'йки', 'ек'])
    );
  }
}
