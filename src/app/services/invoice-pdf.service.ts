import { Injectable } from '@angular/core';
// import { Invoice } from '../models/invoice.model';
// import { jsPDF } from 'jspdf';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class InvoicePdfService {
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

  downloadPdf(type: string) {
    switch (type) {
      case 'invoice': {
        this.createInvoicePdf();
        break;
      }
      case 'contract': {
        this.createContractPdf();
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

  createContractPdf() {
    var docDefinition = {
      content: [
        {
          stack: [
            { text: 'Договор № б/н', style: 'title' },
            { text: 'на аренду мини-экскаватора', style: 'subtitle' },
          ],
        },
        {
          columns: [
            { text: 'г. Минск', style: 'city' },
            { text: '«01» июля 2020 г.', style: 'date' },
          ],
        },
        {
          alignment: 'left',
          text:
            'Индивидуальный Предприниматель Лунцевич Владимир Владимирович, именуемый в дальнейшем "Арендодатель", в лице Лунцевича Владимира Владимировича, действующего на основании свидетельства о регистрации индивидуального предпринимателя, с одной стороны и Частное предприятие «Дзержинский Электромонтажстрой», именуемое в дальнейшем "Арендатор", в лице директора Шаронов А. В. действующего на основании Устава, с другой стороны, заключили настоящий Договор о нижеследующем:',
          style: 'text',
        },
        {
          text: '1. Предмет договора',
          style: 'group',
        },
        {
          alignment: 'justify',
          text:
            '1.1. По настоящему договору Арендодатель за оплату предоставляет Арендатору во временное пользование мини-экскаватор Caterpiller 301.8C и  Volvo EC20B XTV (далее Спецтехника) с экипажем.',
          style: 'text',
        },
        {
          alignment: 'justify',
          text:
            '1.2. Доставка Спецтехники на стройплощадку Арендатора осуществляется силами Арендодателя за счет Арендатора, либо силами Арендатора по договоренности сторон.',
          style: 'text',
        },
        {
          alignment: 'justify',
          text:
            '1.3. Рабочее время Спецтехники измеряется часами и подтверждается составлением сторонами сменного рапорта, который подписывают уполномоченные представители сторон. ',
          style: 'text',
        },
        {
          text: '2. ОБЯЗАННОСТИ АРЕНДОДАТЕЛЯ',
          style: 'group',
        },
        {
          alignment: 'justify',
          text:
            '2.1. Предоставляет необходимый экипаж (квалифицированного машиниста) для управления сдаваемой в аренду техникой. Машинист является уполномоченным представителем Арендодателя на стройплощадке Арендатора.',
          style: 'text',
        },
        {
          alignment: 'justify',
          text:
            '2.2. Обязуется обеспечивать эксплуатацию техники в соответствии с руководством по эксплуатации Спецтехники, правилами техники безопасности и действующего законодательства Республики Беларусь. Проводит текущее обслуживание Спецтехники и все необходимые регламентные работы (заправка ГСМ, прочие расходные материалы).',
          style: 'text',
        },
        {
          text: '3. ОБЯЗАННОСТИ АРЕНДАТОРА',
          style: 'group',
        },
        {
          alignment: 'justify',
          text:
            '3.1. Проводит все необходимые согласования на проведение строительных (земляных и прочих) работ. Единолично несет ответственность за сохранность объектов и коммуникаций на стройплощадке.',
          style: 'text',
        },
        {
          alignment: 'justify',
          text:
            '3.2. Назначает со своей стороны уполномоченное лицо, которое дает распоряжения машинисту и заверяет в сменном рапорте часы работы строительной техники.',
          style: 'text',
        },
        {
          alignment: 'justify',
          text:
            '3.3. Несет полную материальную ответственность за сохранность полученной в аренду техники. В случае ее порчи, полностью возмещает ущерб в полном объёме.',
          style: 'text',
        },
        {
          alignment: 'justify',
          text:
            '3.4. Обеспечивает своевременную арендную плату за полученную в аренду Спецтехнику.',
          style: 'text',
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'Реквизиты №1',
            },
            {
              text: 'Реквизиты №2',
            },
          ],
        },
      ],
      styles: {
        title: {
          fontSize: 12,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },
        subtitle: {
          fontSize: 10,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        city: {
          fontSize: 10,
          bold: true,
          alignment: 'left',
          margin: [0, 0, 0, 10],
        },
        date: {
          fontSize: 10,
          bold: true,
          alignment: 'right',
          margin: [0, 0, 0, 10],
        },
        text: {
          fontSize: 11,
          bold: false,
          alignment: 'left',
          margin: [0, 0, 0, 5],
        },
        group: {
          fontSize: 14,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 5],
        },
        bigger: {
          fontSize: 15,
          italics: true,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  createInvoicePdf() {
    var docDefinition = {
      content: [
        'By default paragraphs are stacked one on top of (or actually - below) another. ',
        "It's possible however to split any paragraph (or even the whole document) into columns.\n\n",
        'Here we go with 2 star-sized columns, with justified text and gap set to 20:\n\n',
        {
          alignment: 'justify',
          columns: [
            {
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
            },
            {
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
            },
          ],
        },
        "\nStar-sized columns have always equal widths, so if we define 3 of those, it'll look like this (make sure to scroll to the next page, as we have a couple of more examples):\n\n",
        {
          columns: [
            {
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
            },
            {
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
            },
            {
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
            },
          ],
        },
        "\nYou can also specify accurate widths for some (or all columns). Let's make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n",
        {
          columns: [
            {
              width: 90,
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
            },
            {
              width: '*',
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
            },
            {
              width: '*',
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
            },
            {
              width: 90,
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
            },
          ],
        },
        '\nWe also support auto columns. They set their widths based on the content:\n\n',
        {
          columns: [
            {
              width: 'auto',
              text: 'auto column',
            },
            {
              width: '*',
              text:
                'This is a star-sized column. It should get the remaining space divided by the number of all star-sized columns.',
            },
            {
              width: 50,
              text: 'this one has specific width set to 50',
            },
            {
              width: 'auto',
              text: 'another auto column',
            },
            {
              width: '*',
              text:
                'This is a star-sized column. It should get the remaining space divided by the number of all star-sized columns.',
            },
          ],
        },
        '\nIf all auto columns fit within available width, the table does not occupy whole space:\n\n',
        {
          columns: [
            {
              width: 'auto',
              text: 'val1',
            },
            {
              width: 'auto',
              text: 'val2',
            },
            {
              width: 'auto',
              text: 'value3',
            },
            {
              width: 'auto',
              text: 'value 4',
            },
          ],
        },
        '\nAnother cool feature of pdfmake is the ability to have nested elements. Each column is actually quite similar to the whole document, so we can have inner paragraphs and further divisions, like in the following example:\n\n',
        {
          columns: [
            {
              width: 100,
              fontSize: 9,
              text:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Conveniunt quieti extremum severitatem disseretur virtute locum virtus declarant. Greges telos detrimenti persius possint eripuit appellat democrito suscipere existimant. Facere usus levitatibus confirmavit, provincia rutilius libris accommodare valetudinis ignota fugienda arbitramur falsarum commodius. Voluptas summis arbitrarer cognitio temperantiamque, fuit posidonium pro assueverit animos inferiorem, affecti honestum ferreum cum tot nemo ius partes dissensio opinor, tuum intellegunt numeris ignorant, odia diligenter licet, sublatum repellere, maior ficta severa quantum mortem. Aut evertitur impediri vivamus.',
            },
            [
              "As you can see in the document definition - this column is not defined with an object, but an array, which means it's treated as an array of paragraphs rendered one below another.",
              "Just like on the top-level of the document. Let's try to divide the remaing space into 3 star-sized columns:\n\n",
              {
                columns: [
                  {
                    text:
                      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
                  },
                  {
                    text:
                      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
                  },
                  {
                    text:
                      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
                  },
                ],
              },
            ],
          ],
        },
        "\n\nOh, don't forget, we can use everything from styling examples (named styles, custom overrides) here as well.\n\n",
        "For instance - our next paragraph will use the 'bigger' style (with fontSize set to 15 and italics - true). We'll split it into three columns and make sure they inherit the style:\n\n",
        {
          style: 'bigger',
          columns: [
            "First column (BTW - it's defined as a single string value. pdfmake will turn it into appropriate structure automatically and make sure it inherits the styles",
            {
              fontSize: 20,
              text:
                "In this column, we've overriden fontSize to 20. It means the content should have italics=true (inherited from the style) and be a little bit bigger",
            },
            {
              style: 'header',
              text:
                "Last column does not override any styling properties, but applies a new style (header) to itself. Eventually - texts here have italics=true (from bigger) and derive fontSize from the style. OK, but which one? Both styles define it. As we already know from our styling examples, multiple styles can be applied to the element and their order is important. Because 'header' style has been set after 'bigger' its fontSize takes precedence over the fontSize from 'bigger'. This is how it works. You will find more examples in the unit tests.",
            },
          ],
        },
        "\n\nWow, you've read the whole document! Congratulations :D",
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        bigger: {
          fontSize: 15,
          italics: true,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
}
