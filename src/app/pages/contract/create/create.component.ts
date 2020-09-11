import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { ContractStatus, Contract } from 'src/app/models/contract.model';
import { Contractor } from 'src/app/models/contractor.model';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { CONTRACT_TEMPLATE } from 'src/app/templates/contracts/contract';

@Component({
  selector: 'app-contract-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ContractCreateComponent implements OnInit {
  contractStatusList: ContractStatus[];
  contract: Contract = new Contract();
  constructor(
    private _contract: ContractService,
    private _notification: NotificationService,
    private _router: Router,
  ) {
    this.getStatuses();

    if (!this.contract.date) {
      this.contract.date = new Date().toString();
    }

    this.contract.template = CONTRACT_TEMPLATE;
  }

  ngOnInit() {}

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
    this.contract.contractor = contractor;
  }

  changeStatus(event) {
    this.contract.status = event.detail.value;
  }

  save() {
    // if (!this.checkCanCreateInvoice()) {
    //   return;
    // }
    this._contract.add(this.contract).subscribe((response: any) => {
      debugger;
      this._notification.success('Договор успешно добавлен');
      this._router.navigate(['/contract'], { replaceUrl: true });
    });
  }
}
