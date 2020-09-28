import { Component, OnInit } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { Contractor } from 'src/app/models/contractor.model';
import { Invoice } from 'src/app/models/invoice.model';
import { ContractService } from 'src/app/services/contract.service';
import { ContractorService } from 'src/app/services/contractor.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-contractor-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less'],
})
export class ContractorDocumentsComponent implements OnInit {
  activeTab = 'invoice';
  selectedContractor: Contractor;
  invoiceList: Invoice[] = [];
  contractList: Contract[] = [];

  constructor(
    private _invoice: InvoiceService,
    private _contract: ContractService,
    private _contractor: ContractorService,
  ) {
    this.fetchContractor();
    this.fetchInvoice();
    this.fetchContract();
  }

  ngOnInit() {}

  fetchContractor() {
    this.selectedContractor = this._contractor.getContractor();
  }

  fetchInvoice() {
    this._invoice.getAllByContractor().subscribe((response: any) => {
      if (response) {
        this.invoiceList = response;
      }
    });
  }

  fetchContract() {
    this._contract.getAllByContractor().subscribe((response: any) => {
      if (response) {
        this.contractList = response;
      }
    });
  }

  segmentChanged(value) {
    this.activeTab = value.detail.value;
  }
}
