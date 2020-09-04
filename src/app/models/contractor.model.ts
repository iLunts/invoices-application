export class Contractor {
  _id: string;
  _createdDate: string;

  info: ContractorInfo;
  mailingAddress: ContractorAddress;
  juridicalAddress: ContractorAddress;

  constructor(
    _id?: string,
    _createdDate?: string,
    info?: ContractorInfo,
    mailingAddress?: ContractorAddress,
    juridicalAddress?: ContractorAddress
  ) {
    this._id = this._id || null;
    this._createdDate = this._createdDate || null;
    this.info = info || new ContractorInfo();
    this.mailingAddress = mailingAddress || new ContractorAddress();
    this.juridicalAddress = juridicalAddress || new ContractorAddress();
  }
}

export class ContractorAddress {
  zipCode: string;
  country: string;
  countryType: string;
  city: string;
  street: string;
  houseNumber: string;
  office: string;
  email: string;
  phone: string;

  constructor(
    zipCode?: string,
    country?: string,
    countryType?: string,
    city?: string,
    street?: string,
    houseNumber?: string,
    office?: string,
    email?: string,
    phone?: string
  ) {
    this.zipCode = zipCode || null;
    this.country = country || null;
    this.countryType = countryType || null;
    this.city = city || null;
    this.street = street || null;
    this.houseNumber = houseNumber || null;
    this.office = office || null;
    this.email = email || null;
    this.phone = phone || null;
  }

  // getAddressFromEGR(data: any) {
  //   let obj = new ContractorAddress();
  //   return obj;
  // }
}

export class ContractorInfo {
  fullName?: string;
  fullNameBel?: string;
  shortName?: string;
  shortNameBel?: string;
  name?: string;
  nameBel?: string;
  registrationDate?: string;
  unp?: string;

  constructor(
    fullName?: string,
    fullNameBel?: string,
    shortName?: string,
    shortNameBel?: string,
    name?: string,
    nameBel?: string,
    registrationDate?: string,
    unp?: string
  ) {
    this.fullName = fullName || null;
    this.fullNameBel = fullNameBel || null;
    this.shortName = shortName || null;
    this.shortNameBel = shortNameBel || null;
    this.name = name || null;
    this.nameBel = nameBel || null;
    this.registrationDate = registrationDate || null;
    this.unp = unp || null;
  }
}
