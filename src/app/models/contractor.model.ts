export class Contractor {
  _id: string;
  fullName: string;
  shortName: string;
  name: string;
  uin: string;
  isResident: boolean;
  isLegalPerson: boolean; // Контрагент — организация/ИП
  countryId: number;
  // isFavorite: boolean; // Избранный контрагент
  email: string;
  phone: string;
  responsiblePerson: string; // Ответственное лицо
  address: string;
  juridicalAddress: string;

  constructor(
    fullName: string,
    shortName: string,
    name: string,
    uin: string,
    isResident: boolean,
    isLegalPerson: boolean,
    countryId: number,
    email: string,
    phone: string,
    responsiblePerson: string,
    address: string,
    juridicalAddress: string
  ) {
    this.fullName = fullName;
    this.shortName = shortName;
    this.name = name;
    this.uin = uin;
    this.isResident = isResident;
    this.isLegalPerson = isLegalPerson;
    this.countryId = countryId;
    this.email = email;
    this.phone = phone;
    this.responsiblePerson = responsiblePerson;
    this.address = address;
    this.juridicalAddress = juridicalAddress;
  }
}
