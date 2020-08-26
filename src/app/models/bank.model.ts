
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
}

export class BankAccount {
  bank: Bank;
  SWIFT: string;
}
