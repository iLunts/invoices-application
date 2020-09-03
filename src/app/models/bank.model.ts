export class Bank {
  _doc: string;

  AdrBank: string;
  BICStatus: string;
  CDBank: string;
  CDHeadBank: string;
  CdBankSuccessor: string;
  CdControl: string;
  DTBegin: string;
  DtControl: string; // [ null - действует, ЗАКР, ЛИКВ ]
  DtEnd: string;
  NmBankShort: string;
  NrBank: string;
  typ: string;

  constructor(
    _doc?: string,
    AdrBank?: string,
    BICStatus?: string,
    CDBank?: string,
    CDHeadBank?: string,
    CdBankSuccessor?: string,
    CdControl?: string,
    DTBegin?: string,
    DtControl?: string,
    DtEnd?: string,
    NmBankShort?: string,
    NrBank?: string,
    typ?: string
  ) {
    this._doc = _doc || null;
    this.AdrBank = AdrBank || null;
    this.BICStatus = BICStatus || null;
    this.CDBank = CDBank || null;
    this.CDHeadBank = CDHeadBank || null;
    this.CdBankSuccessor = CdBankSuccessor || null;
    this.CdControl = CdControl || null;
    this.DTBegin = DTBegin || null;
    this.DtControl = DtControl || null;
    this.DtEnd = DtEnd || null;
    this.NmBankShort = NmBankShort || null;
    this.NrBank = NrBank || null;
    this.typ = typ || null;
  }
}

export class BankAccount {
  bank: Bank;
  SWIFT: string;

  constructor(bank?: Bank, SWIFT?: string) {
    this.bank = bank || new Bank() || null;
    this.SWIFT = SWIFT || null;
  }
}
