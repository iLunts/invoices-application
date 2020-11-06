export const INVOICE_TEMPLATE_LOGO = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td style="width: 50%; border: 0">
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          LOGOTYPE
        </p>
      </td>
      <td style="width: 50%; border: 0">
        <p style="font-size: 21px; color: #ff0000; text-align: right">
          Счет # {{invoiceNumber invoice.number}}
        </p>
        <p style="font-size: 12px; color: #5b5b5b; text-align: right">
          <small>Дата создания: </small> {{formatDate invoice.createDate "DD.MM.YYYY"}}<br />
          <small>Счет действителен до: {{formatDate invoice.expiredDate "DD.MM.YYYY"}}</small>
        </p>
      </td>
    </tr>
  </tbody>
</table>`;
export const INVOICE_TEMPLATE_HEADER = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td style="width: 50%; border: 0">
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #333333;
            font-weight: 600;
            text-align: left;
          "
        >
          <strong>Получатель</strong>
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          {{invoice.profile.info.fullName}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          УНП: {{invoice.profile.info.unp}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          Юр. адрес: {{invoice.profile.juridicalAddress.zipCode}}&nbsp;
          {{invoice.profile.juridicalAddress.country}}&nbsp;
          г. {{invoice.profile.juridicalAddress.city}}&nbsp;
          ул. {{invoice.profile.juridicalAddress.street}}&nbsp;
          д.{{invoice.profile.juridicalAddress.houseNumber}}&nbsp;
          оф.{{invoice.profile.juridicalAddress.office}}&nbsp;
        </p>
      </td>
      <td style="width: 50%; border: 0">
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #333333;
            font-weight: 600;
            text-align: left;
          "
        >
          <strong>Плательщик</strong>
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          {{invoice.contractor.info.fullName}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          УНП: {{invoice.contractor.info.unp}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          Юр. адрес: {{invoice.contractor.juridicalAddress.zipCode}}&nbsp;
          {{invoice.contractor.juridicalAddress.country}}&nbsp;
          г. {{invoice.contractor.juridicalAddress.city}}&nbsp;
          ул. {{invoice.contractor.juridicalAddress.street}}&nbsp;
          д.{{invoice.contractor.juridicalAddress.houseNumber}}&nbsp;
          оф.{{invoice.contractor.juridicalAddress.office}}&nbsp;
        </p>
      </td>
    </tr>
  </tbody>
</table>
`;
export const INVOICE_TEMPLATE_TABLE = `
 <table style="width: 100%; margin: 40px 0; vertical-align: middle;">
      <thead>
        <tr>
          <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">П.п.</th>
          <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; text-align: left;">Наименование товара</th>
          <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">Ед. измерения</th>
          <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">Кол-во</th>
          <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">Цена</th>
          <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">НДС</th>
          <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; width: 20%;">Сумма</th>
        </tr>
      </thead>
      <tbody>
        {{#each invoice.services}}
        <tr style="vertical-align: middle; border-bottom: 1px solid #333;">
          <td valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px; text-align: center;">{{getIndex @index}}</td>
          <td valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px;">{{this.name}}</td>
          <td valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px; text-align: center;">{{this.unit.shortName}}</td>
          <td class="cell--bold" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px;"><strong>{{this.count}}</strong></td>
          <td class="cell--bold" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px;">{{this.price}}</td>
          <td class="cell--bold" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px;">{{this.tax}}</td>
          <td class="cell--bold" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px; width: 20%;">{{getSum this.this.count this.this.price}}</td>
        </tr>
        {{/each}}
        <tr>
          <td colspan="6" class="invoice-cell-footer-label" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Итого:</td>
          <td class="invoice-cell-footer-summa" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">{{getTotalSumDigs}}</td>
        </tr>
        <tr>
          <td colspan="6" class="invoice-cell-footer-label" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Всего с НДС:</td>
          <td class="invoice-cell-footer-summa" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Без НДС</td>
        </tr>
        <tr>
          <td colspan="6" class="invoice-cell-footer-label" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Всего к оплате с НДС:</td>
          <td class="invoice-cell-footer-summa" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">{{getTotalSumDigs}}</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
export const INVOICE_TEMPLATE_NOTE = `
<p class="invoice-note">Всего наименований 2(два), на сумму {{getTotalSumDigs}} ({{getTotalSum}})</p>
`;
export const INVOICE_TEMPLATE_SIGN = `
<p class="invoice-sign">
  {{invoice.profile.info.fullName}} 
  <img src="{{invoice.signature.sign}}" style="display: inline-block; vertical-align: middle; width: 130px;"/> (подпись)
</p>`;
export const INVOICE_TEMPLATE_QR_CODE = `<p class="invoice-sign">Отсканируйте код из мобильного приложения invoices.by чтобы открыть документ
<img src="{{invoice.qrCode}}" style="display: inline-block; vertical-align: middle; width: 100px; margin-left: 15px;"/></p>`;
