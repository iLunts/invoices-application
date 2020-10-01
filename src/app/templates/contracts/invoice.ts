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
          Счет # {{invoiceNumber number}}
        </p>
        <p style="font-size: 12px; color: #5b5b5b; text-align: right">
          <small>Дата создания: </small> {{formatDate createDate "DD.MM.YYYY"}}<br />
          <small>Счет действителен до: {{formatDate expiredDate "DD.MM.YYYY"}}</small>
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
            color: #5b5b5b;
            text-align: left;
          "
        >
          {{contractor.info.fullName}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          УНП: {{contractor.info.unp}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          Юр. адрес: {{contractor.juridicalAddress.zipCode}}&nbsp;
          {{contractor.juridicalAddress.country}}&nbsp;
          г. {{contractor.juridicalAddress.city}}&nbsp;
          ул. {{contractor.juridicalAddress.street}}&nbsp;
          д.{{contractor.juridicalAddress.houseNumber}}&nbsp;
          оф.{{contractor.juridicalAddress.office}}&nbsp;
        </p>
      </td>
      <td style="width: 50%; border: 0">
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          {{contractor.info.fullName}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          УНП: {{contractor.info.unp}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          Юр. адрес: {{contractor.juridicalAddress.zipCode}}&nbsp;
          {{contractor.juridicalAddress.country}}&nbsp;
          г. {{contractor.juridicalAddress.city}}&nbsp;
          ул. {{contractor.juridicalAddress.street}}&nbsp;
          д.{{contractor.juridicalAddress.houseNumber}}&nbsp;
          оф.{{contractor.juridicalAddress.office}}&nbsp;
        </p>
      </td>
    </tr>
  </tbody>
</table>
`;
export const INVOICE_TEMPLATE_FOOTER = `<h1>FOOTER</h1>`;
