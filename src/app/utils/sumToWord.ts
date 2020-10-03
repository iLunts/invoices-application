import { OnInit } from '@angular/core';
import * as rubles from 'rubles';

export class SumToWord {
  constructor() {}

  // rub = '';
  // kop = '';
  // money;
  // price;
  // litera = '';
  // sotny = '';
  // desatky = '';
  // edinicy = '';
  // minus = '';

  // k = 0;
  // i = 0;
  // j = 0;
  // N = [
  //   '',
  //   'один',
  //   'два',
  //   'три',
  //   'четыре',
  //   'пять',
  //   'шесть',
  //   'семь',
  //   'восемь',
  //   'девять',
  //   '',
  //   'одиннадцать',
  //   'двенадцать',
  //   'тринадцать',
  //   'четырнадцать',
  //   'пятнадцать',
  //   'шестнадцать',
  //   'семнадцать',
  //   'восемнадцать',
  //   'девятнадцать',
  //   '',
  //   'десять',
  //   'двадцать',
  //   'тридцать',
  //   'сорок',
  //   'пятьдесят',
  //   'шестьдесят',
  //   'семьдесят',
  //   'восемьдесят',
  //   'девяносто',
  //   '',
  //   'сто',
  //   'двести',
  //   'триста',
  //   'четыреста',
  //   'пятьсот',
  //   'шестьсот',
  //   'семьсот',
  //   'восемьсот',
  //   'девятьсот',
  //   'тысяч',
  //   'тысяча',
  //   'тысячи',
  //   'тысячи',
  //   'тысячи',
  //   'тысяч',
  //   'тысяч',
  //   'тысяч',
  //   'тысяч',
  //   'тысяч',
  //   'миллионов',
  //   'миллион',
  //   'миллиона',
  //   'миллиона',
  //   'миллиона',
  //   'миллионов',
  //   'миллионов',
  //   'миллионов',
  //   'миллионов',
  //   'миллионов',
  //   'миллиардов',
  //   'миллиард',
  //   'миллиарда',
  //   'миллиарда',
  //   'миллиарда',
  //   'миллиардов',
  //   'миллиардов',
  //   'миллиардов',
  //   'миллиардов',
  //   'миллиардов',
  // ];

  // M = new Array(10);
  // R = new Array(
  //   'рублей',
  //   'рубль',
  //   'рубля',
  //   'рубля',
  //   'рубля',
  //   'рублей',
  //   'рублей',
  //   'рублей',
  //   'рублей',
  //   'рублей'
  // );
  // K = new Array(
  //   'копеек',
  //   'копейка',
  //   'копейки',
  //   'копейки',
  //   'копейки',
  //   'копеек',
  //   'копеек',
  //   'копеек',
  //   'копеек',
  //   'копеек'
  // );

  // public static toWordsConverter(val) {
  //   // this.toWordsConverterStr(val);
  // }

  // public toWordsConverterStr(val) {
  //   for (let j = 0; j < 10; ++j) {
  //     this.M[j] = new Array(this.N.length);
  //   }
  //   for (let i = 0; i < this.N.length; i++) {
  //     for (let j = 0; j < 10; j++) {
  //       this.M[j][i] = this.N[this.k++];
  //     }
  //   }
  //   this.num2str(this.money);
  // }

  // public num2str(money) {
  //   (this.rub = ''), (this.kop = '');
  //   money = money.replace(',', '.');
  //   if (isNaN(money)) {
  //     return 'Не числовое значение';
  //   }
  //   if (money.substr(0, 1) == '-') {
  //     money = money.substr(1);
  //     this.minus = 'минус ';
  //   } else {
  //     this.minus = '';
  //   }
  //   money = Math.round(money * 100) / 100 + '';
  //   if (money.indexOf('.') != -1) {
  //     this.rub = money.substr(0, money.indexOf('.'));
  //     this.kop = money.substr(money.indexOf('.') + 1);
  //     if (this.kop.length == 1) {
  //       this.kop += '0';
  //     }
  //   } else {
  //     this.rub = money;
  //   }
  //   if (this.rub.length > 12) {
  //     return 'Слишком большое число';
  //   }
  //   let res;
  //   let ru = this.propis((this.price = this.rub), this.R);
  //   let ko = this.propis((this.price = this.kop), this.K);
  //   ko != '' ? (res = ru + ' ' + ko) : (res = ru);
  //   ru == 'Ноль ' + this.R[0] && ko != '' ? (res = ko) : 0;
  //   this.kop == '0' ? (res += ' ноль ' + this.K[0]) : 0;
  //   return (
  //     (this.minus + res).substr(0, 1).toUpperCase() +
  //     (this.minus + res).substr(1)
  //   );
  // }

  // public propis(price, D) {
  //   let litera = '';
  //   for (let i = 0; i < price.length; i += 3) {
  //     let sotny = '';
  //     let desatky = '';
  //     let edinicy = '';
  //     if (this.n(i + 2, 2) > 10 && this.n(i + 2, 2) < 20) {
  //       edinicy =
  //         ' ' + this.M[this.n(i + 1, 1)][1] + ' ' + this.M[0][i / 3 + 3];
  //       i == 0 ? (edinicy += D[0]) : 0;
  //     } else {
  //       edinicy = this.M[this.n(i + 1, 1)][0];
  //       edinicy == 'один' && (i == 3 || D == this.K) ? (edinicy = 'одна') : 0;
  //       edinicy == 'два' && (i == 3 || D == this.K) ? (edinicy = 'две') : 0;
  //       i == 0 && edinicy != ''
  //         ? 0
  //         : (edinicy += ' ' + this.M[this.n(i + 1, 1)][i / 3 + 3]);
  //       edinicy == ' '
  //         ? (edinicy = '')
  //         : edinicy == ' ' + this.M[this.n(i + 1, 1)][i / 3 + 3]
  //         ? 0
  //         : (edinicy = ' ' + edinicy);
  //       i == 0 ? (edinicy += ' ' + D[this.n(i + 1, 1)]) : 0;
  //       (desatky = this.M[this.n(i + 2, 1)][2]) != ''
  //         ? (desatky = ' ' + desatky)
  //         : 0;
  //     }
  //     (sotny = this.M[this.n(i + 3, 1)][3]) != '' ? (sotny = ' ' + sotny) : 0;
  //     if (
  //       this.price.substr(this.price.length - i - 3, 3) == '000' &&
  //       edinicy == ' ' + this.M[0][i / 3 + 3]
  //     ) {
  //       edinicy = '';
  //     }
  //     litera = sotny + desatky + edinicy + litera;
  //   }
  //   if (litera == ' ' + this.R[0]) {
  //     return 'ноль' + litera;
  //   } else {
  //     return litera.substr(1);
  //   }
  // }

  // public n(start, len) {
  //   if (start > this.price.length) {
  //     return 0;
  //   } else {
  //     return Number(this.price.substr(this.price.length - start, len));
  //   }
  // }

  public static toWordsConverter(value) {
    return value;
  }
}
