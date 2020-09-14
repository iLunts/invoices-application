import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { EgrService } from 'src/app/services/egr.service';
import { Platform } from '@ionic/angular';
import { Contractor } from 'src/app/models/contractor.model';
import { ContractorService } from 'src/app/services/contractor.service';
import { Bank, BankAccount } from 'src/app/models/bank.model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-contractor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ContractorCreateComponent implements OnInit {
  form: FormGroup;
  unpSearch: string;
  data: any;
  contractor: Contractor = new Contractor();
  isExistContractor: any;
  isCollapse: boolean;
  isLoadingSearchUnp: boolean;

  constructor(
    private _contractor: ContractorService,
    private _fb: FormBuilder,
    private _egr: EgrService,
    private _router: Router,
    private _notification: NotificationService
  ) {
    this.form = this._fb.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {}

  searchByUNP() {
    this.isLoadingSearchUnp = true;
    this.contractor = this._egr.getContractorByUnp(this.unpSearch);
    this.isLoadingSearchUnp = false;
    // this._contractor
    //   .checkExistContactorByUNP(this.unpSearch)
    //   .valueChanges((response: any) => {
    //     this.isExistContractor = response;
    //     this.isLoadingSearchUnp = false;
    //     debugger;
    //   });
  }

  save() {
    this._contractor.add(this.contractor).subscribe((response: any) => {
      this._notification.success('Контрагент успешно создан');
      this._router.navigate(['/contractor'], { replaceUrl: true });
    });
  }

  collapse(event: boolean) {
    this.isCollapse = event;
  }

  selectBank(data: Bank) {
    this.contractor.bankAccount.bank = data;
  }
}
