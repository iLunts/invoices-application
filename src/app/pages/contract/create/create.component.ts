import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { ContractStatus, Contract } from 'src/app/models/contract.model';
import { Contractor } from 'src/app/models/contractor.model';
import { NotificationService } from 'src/app/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CONTRACT_TEMPLATE } from 'src/app/templates/contracts/contract';
import { ContractorService } from 'src/app/services/contractor.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-contract-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ContractCreateComponent implements OnInit {
  contractStatusList: ContractStatus[];
  contract: Contract = new Contract();
  customStatusActionSheetOptions: any = {
    // header: 'Статусы',
    subHeader: 'Выберите статус для этого договора',
    cssClass: 'select-action-sheet',
  };

  constructor(
    private _contract: ContractService,
    private _contractor: ContractorService,
    private _invoice: InvoiceService,
    private _notification: NotificationService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe((params) => {
      if (params.contractorId) {
        this.fetchContractor(params.contractorId);
      }
      if (params.invoiceId) {
        this.contract._invoiceId = params.invoiceId;
      }
    });

    this.getStatuses();

    if (!this.contract.date) {
      this.contract.date = new Date().toString();
    }

    this.contract.template = CONTRACT_TEMPLATE;
  }

  ngOnInit() {}

  fetchContractor(contractorId: string) {
    this._contractor
      .getById(contractorId)
      .valueChanges()
      .subscribe((response: any) => {
        this.selectContractor(response);
      });
  }

  getStatuses() {
    this._contract.getAllStatus().subscribe((response: ContractStatus[]) => {
      if (response) {
        this.contractStatusList = response;
        this.contract.status = this.contractStatusList[0];
      }
    });
  }

  selectContractor(contractor: Contractor) {
    if (!contractor) {
      return;
    }
    this.contract.contractor = contractor[0];
  }

  changeStatus(event) {
    this.contract.status = event.detail.value;
  }

  save() {
    // if (!this.checkCanCreateInvoice()) {
    //   return;
    // }
    // if(this.contract._invoiceId){

    // }
    this._contract.add(this.contract).subscribe((response: any) => {
      this._invoice
        .update(this.contract._invoiceId, { _contractId: this.contract._id })
        .then((resp: any) => {
          this._notification.success('Договор успешно добавлен');
          this._router.navigate(['/contract'], { replaceUrl: true });
        });
    });
  }
}
