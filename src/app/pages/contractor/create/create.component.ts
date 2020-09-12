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

  constructor(
    private _contractor: ContractorService,
    private _fb: FormBuilder,
    private _egr: EgrService
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
    this.contractor = this._egr.getContractorByUnp(this.unpSearch);
    this._contractor.checkExistContactorByUNP(this.unpSearch).valueChanges((response: any) => {
      this.isExistContractor = response;
    });
  }

  save() {
    console.log('Contractor: ', this.contractor);

    this._contractor.add(this.contractor).subscribe((response: any) => {
      // debugger;
    });
  }
}
